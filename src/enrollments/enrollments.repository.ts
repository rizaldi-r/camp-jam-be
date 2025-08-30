import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Enrollment, EnrollmentData, Prisma } from '@prisma/client';
import {
  CreateEnrollmentData,
  EnrollmentRepositoryItf,
  EnrollmentWithProgressIds,
  FindAllCoursesQuery,
  SearchBy,
  SearchData,
  SortBy,
  SortOption,
  UpdateEnrollmentData,
  UpdateEnrollmentDataData,
} from 'src/enrollments/types/enrollments.repository.interface';

@Injectable()
export class EnrollmentsRepository implements EnrollmentRepositoryItf {
  constructor(private readonly prisma: PrismaService) {}

  private buildSearchCondition(
    search: SearchData,
  ): Prisma.EnrollmentWhereInput {
    const { searchQuery, searchBy } = search;

    if (!searchQuery.trim()) return {};

    switch (searchBy) {
      case SearchBy.TITLE:
        return {
          course: {
            title: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
        };

      case SearchBy.INSTRUCTOR_NAME:
        return {
          instructor: {
            user: {
              OR: [
                {
                  firstName: {
                    contains: searchQuery,
                    mode: 'insensitive',
                  },
                },
                {
                  lastName: {
                    contains: searchQuery,
                    mode: 'insensitive',
                  },
                },
                {
                  // Search full name (concatenated)
                  AND: [
                    {
                      OR: searchQuery.split(' ').map((term) => ({
                        OR: [
                          {
                            firstName: {
                              contains: term,
                              mode: 'insensitive',
                            },
                          },
                          {
                            lastName: {
                              contains: term,
                              mode: 'insensitive',
                            },
                          },
                        ],
                      })),
                    },
                  ],
                },
              ],
            },
          },
        };

      default:
        return {};
    }
  }

  private buildOrderByClause(
    sort?: SortOption,
  ): Prisma.EnrollmentOrderByWithRelationInput[] {
    if (!sort) {
      // Default sorting by enrollment date (newest first)
      return [{ createdAt: 'desc' }];
    }

    const { sortBy, sortOrder } = sort;

    switch (sortBy) {
      case SortBy.TITLE:
        return [
          {
            course: {
              title: sortOrder,
            },
          },
        ];

      case SortBy.CREATED_AT:
        return [{ createdAt: sortOrder }];

      default:
        return [{ createdAt: 'desc' }];
    }
  }

  async getStudentOwnerId(id: string): Promise<string | null> {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
      select: {
        studentId: true,
      },
    });
    return enrollment?.studentId ?? null;
  }

  async getInstructorOwnerId(id: string): Promise<string | null> {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
      select: {
        instructorId: true,
      },
    });
    return enrollment?.instructorId ?? null;
  }

  async create(data: CreateEnrollmentData): Promise<Enrollment> {
    return this.prisma.enrollment.create({
      data,
    });
  }

  async createEnrollmentDataRecords(
    enrollmentId: string,
    moduleTotal: number,
    lectureTotal: number,
    assignmentTotal: number,
    totalAssignmentScore: number,
  ): Promise<void> {
    await this.prisma.$transaction(async (prisma) => {
      // Create the module progress data record
      const moduleProgressData = await prisma.enrollmentData.create({
        data: {
          moduleTotal: moduleTotal,
          moduleCompleted: 0,
        },
      });

      // Create the lecture progress data record
      const lectureProgressData = await prisma.enrollmentData.create({
        data: {
          moduleTotal: lectureTotal,
          moduleCompleted: 0,
        },
      });

      // Create the assignment progress data record
      const assignmentProgressData = await prisma.enrollmentData.create({
        data: {
          moduleTotal: assignmentTotal,
          moduleCompleted: 0,
        },
      });

      // Create the assignment scores data record
      const assignmentScoresData = await prisma.enrollmentData.create({
        data: {
          moduleTotal: totalAssignmentScore,
          moduleCompleted: 0,
        },
      });

      // Now, link the newly created EnrollmentData records to the Enrollment
      await prisma.enrollment.update({
        where: { id: enrollmentId },
        data: {
          moduleProgress: { connect: { id: moduleProgressData.id } },
          lectureProgress: { connect: { id: lectureProgressData.id } },
          assignmentProgress: { connect: { id: assignmentProgressData.id } },
          assignmentScore: { connect: { id: assignmentScoresData.id } },
        },
      });
    });
  }

  async findById(
    id: string,
    query?: FindAllCoursesQuery,
  ): Promise<EnrollmentWithProgressIds | null> {
    // return this.prism
    const {
      includeSubmissions,
      includeAllProgress,
      includeCourse,
      includeSections,
    } = query || {};

    const include: Prisma.EnrollmentInclude = {
      instructor: { include: { user: true } },
      student: { include: { user: true } },
      moduleProgress: true,
      lectureProgress: includeAllProgress ? true : false,
      assignmentProgress: includeAllProgress ? true : false,
      assignmentScore: includeAllProgress ? true : false,
      course: includeCourse
        ? {
            include: {
              sections: includeSections
                ? { include: { modules: true } }
                : false,
              categories: {
                include: { category: true },
              },
            },
          }
        : false,
      submissions: includeSubmissions
        ? {
            include: {
              submissionTemplate: true,
              submissionFieldValue: {
                include: {
                  submissionField: true,
                },
              },
            },
          }
        : false,
    };

    return this.prisma.enrollment.findUnique({
      where: { id },
      include,
    });
  }

  async findByStudentId(
    studentId: string,
    query: FindAllCoursesQuery,
  ): Promise<Enrollment[]> {
    const {
      includeSubmissions,
      includeAllProgress,
      includeCourse,
      includeSections,
      includeModuleProgresses,
      courseId,
      courseCategoryId,
      search,
      sort,
    } = query;

    const include: Prisma.EnrollmentInclude = {
      instructor: { include: { user: true } },
      moduleProgress: true,
      lectureProgress: includeAllProgress ? true : false,
      assignmentProgress: includeAllProgress ? true : false,
      assignmentScore: includeAllProgress ? true : false,
      moduleProgresses: includeModuleProgresses ? true : false,
      course: includeCourse
        ? {
            include: {
              sections: includeSections
                ? { include: { modules: true } }
                : false,
              categories: {
                include: { category: true },
              },
            },
          }
        : false,
      submissions: includeSubmissions
        ? {
            include: {
              submissionTemplate: true,
              submissionFieldValue: {
                include: {
                  submissionField: true,
                },
              },
            },
          }
        : false,
    };

    const where: Prisma.EnrollmentWhereInput = {
      studentId,
      ...(courseId && { courseId }),
      ...(courseCategoryId && {
        course: {
          categories: {
            some: {
              categoryId: courseCategoryId,
            },
          },
        },
      }),
      // Add search functionality
      ...(search && this.buildSearchCondition(search)),
    };

    // Build orderBy clause
    const orderBy = this.buildOrderByClause(sort);

    return this.prisma.enrollment.findMany({
      where,
      include,
      orderBy,
    });
  }

  async findByStudentAndCourse(
    studentId: string,
    courseId: string,
  ): Promise<Enrollment | null> {
    return this.prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId: studentId,
          courseId: courseId,
        },
      },
    });
  }

  async findAll(): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany({
      include: {
        moduleProgress: true,
        lectureProgress: true,
        assignmentProgress: true,
        assignmentScore: true,
      },
    });
  }

  async findByCourseId(courseId: string): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany({
      where: {
        courseId: courseId,
      },
      include: {
        moduleProgress: true,
        lectureProgress: true,
        assignmentProgress: true,
        assignmentScore: true,
        submissions: {
          include: {
            submissionTemplate: true,
            submissionFieldValue: {
              include: { submissionField: true },
            },
          },
        },
        instructor: { include: { user: true } },
        student: { include: { user: true } },
      },
    });
  }

  async getEnrollmentDataAssignmentByEnrollmentId(enrollmentId: string) {
    const enrollmentData = await this.prisma.enrollmentData.findUnique({
      where: { assignmentScoreId: enrollmentId },
    });
    return enrollmentData;
  }

  async update(id: string, data: UpdateEnrollmentData): Promise<Enrollment> {
    return this.prisma.enrollment.update({
      where: { id },
      data,
    });
  }

  async updateEnrollmentDataAssignment(
    enrollmentId: string,
    data: UpdateEnrollmentDataData,
  ): Promise<EnrollmentData> {
    const enrollmentData = await this.prisma.enrollmentData.update({
      where: { assignmentScoreId: enrollmentId },
      data,
    });
    return enrollmentData;
  }

  async delete(id: string): Promise<Enrollment> {
    return this.prisma.enrollment.delete({ where: { id } });
  }
}
