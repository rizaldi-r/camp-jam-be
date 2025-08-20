import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Enrollment, EnrollmentData, Prisma } from '@prisma/client';
import {
  CreateEnrollmentData,
  EnrollmentRepositoryItf,
  EnrollmentWithProgressIds,
  FindAllCoursesQuery,
  UpdateEnrollmentData,
  UpdateEnrollmentDataData,
} from 'src/enrollments/types/enrollments.repository.interface';

@Injectable()
export class EnrollmentsRepository implements EnrollmentRepositoryItf {
  constructor(private readonly prisma: PrismaService) {}

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

  async findById(id: string): Promise<EnrollmentWithProgressIds | null> {
    return this.prisma.enrollment.findUnique({
      where: { id },
      include: {
        moduleProgress: true,
        lectureProgress: true,
        assignmentProgress: true,
        assignmentScore: true,
        course: true,
        submissions: {
          include: {
            submissionTemplate: true,
            submissionFieldValue: {
              include: { submissionField: true },
            },
          },
        },
      },
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
      courseId,
      courseCategoryId,
    } = query;

    const include: Prisma.EnrollmentInclude = {
      instructor: { include: { user: true } },
      moduleProgress: true,
      lectureProgress: includeAllProgress ? true : false,
      assignmentProgress: includeAllProgress ? true : false,
      assignmentScore: includeAllProgress ? true : false,
      course: includeCourse
        ? {
            include: {
              sections: { include: { modules: true } },
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
      ...(courseCategoryId && {
        course: {
          categories: {
            some: {
              categoryId: courseCategoryId,
            },
          },
        },
      }),
      ...(courseId && {
        course: {
          id: courseId,
        },
      }),
    };

    return this.prisma.enrollment.findMany({
      where,
      include,
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
        // submissions: {
        //   include: {
        //     submissionTemplate: true,
        //     submissionFieldValue: {
        //       include: { submissionField: true },
        //     },
        //   },
        // },
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
