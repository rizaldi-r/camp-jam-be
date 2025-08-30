import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Course, Prisma } from '@prisma/client';
import {
  ICreateCourse,
  IFindAllCoursesQuery,
  IFindOneCourseQuery,
  IUpdateCourse,
} from 'src/courses/types/courses.repostory.interface';

@Injectable()
export class CoursesRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Builds the WHERE clause for filtering courses
   */
  private buildWhereClause(
    query: IFindAllCoursesQuery,
  ): Prisma.CourseWhereInput {
    const {
      title,
      program,
      categoryId,
      categoryName,
      instructorId,
      instructorName,
      instructorUsername,
      studentId,
      studentName,
      studentUsername,
    } = query;

    const where: Prisma.CourseWhereInput = {};

    // Filter by course title (case-insensitive)
    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      };
    }

    // Filter by allowed program (array contains filter)
    if (program) {
      where.allowedPrograms = {
        hasSome: [program],
      };
    }

    // Category filters (prioritize ID over name)
    this.applyCategoryFilter(where, categoryId, categoryName);

    // Instructor filters (prioritize ID over name/username)
    this.applyInstructorFilter(
      where,
      instructorId,
      instructorName,
      instructorUsername,
    );

    // Student filters (prioritize ID over username over name)
    this.applyStudentFilter(where, studentId, studentName, studentUsername);

    return where;
  }

  /**
   * Applies category filtering logic
   */
  private applyCategoryFilter(
    where: Prisma.CourseWhereInput,
    categoryId?: string,
    categoryName?: string,
  ): void {
    if (categoryId) {
      where.categories = {
        some: {
          categoryId,
        },
      };
    } else if (categoryName) {
      where.categories = {
        some: {
          category: {
            name: {
              contains: categoryName,
              mode: 'insensitive',
            },
          },
        },
      };
    }
  }

  /**
   * Applies instructor filtering logic with priority: ID > Username > Name
   */
  private applyInstructorFilter(
    where: Prisma.CourseWhereInput,
    instructorId?: string,
    instructorName?: string,
    instructorUsername?: string,
  ): void {
    if (instructorId) {
      // Priority 1: Filter by instructor ID
      where.instructorId = instructorId;
    } else if (instructorUsername) {
      // Priority 2: Filter by instructor username
      where.instructor = {
        user: {
          username: {
            contains: instructorUsername,
            mode: 'insensitive',
          },
        },
      };
    } else if (instructorName) {
      // Priority 3: Filter by instructor name (first or last name)
      where.instructor = {
        user: {
          OR: [
            {
              firstName: {
                contains: instructorName,
                mode: 'insensitive',
              },
            },
            {
              lastName: {
                contains: instructorName,
                mode: 'insensitive',
              },
            },
            {
              AND: instructorName.split(' ').map((term) => ({
                OR: [
                  {
                    firstName: {
                      contains: term.trim(),
                      mode: 'insensitive',
                    },
                  },
                  {
                    lastName: {
                      contains: term.trim(),
                      mode: 'insensitive',
                    },
                  },
                ],
              })),
            },
          ],
        },
      };
    }
  }

  /**
   * Applies student filtering logic with priority: ID > Username > Name
   */
  private applyStudentFilter(
    where: Prisma.CourseWhereInput,
    studentId?: string,
    studentName?: string,
    studentUsername?: string,
  ): void {
    if (studentId) {
      // Priority 1: Filter by student ID
      where.enrollments = {
        some: {
          studentId,
        },
      };
    } else if (studentUsername) {
      // Priority 2: Filter by student username
      where.enrollments = {
        some: {
          student: {
            user: {
              username: {
                contains: studentUsername,
                mode: 'insensitive',
              },
            },
          },
        },
      };
    } else if (studentName) {
      // Priority 3: Filter by student name (first or last name)
      where.enrollments = {
        some: {
          student: {
            user: {
              OR: [
                {
                  firstName: {
                    contains: studentName,
                    mode: 'insensitive',
                  },
                },
                {
                  lastName: {
                    contains: studentName,
                    mode: 'insensitive',
                  },
                },
                {
                  AND: studentName.split(' ').map((term) => ({
                    OR: [
                      {
                        firstName: {
                          contains: term.trim(),
                          mode: 'insensitive',
                        },
                      },
                      {
                        lastName: {
                          contains: term.trim(),
                          mode: 'insensitive',
                        },
                      },
                    ],
                  })),
                },
              ],
            },
          },
        },
      };
    }
  }

  /**
   * Builds the ORDER BY clause for sorting courses
   */
  private buildOrderByClause(
    sortBy?: string,
    sortOrder: 'asc' | 'desc' = 'desc',
  ): Prisma.CourseOrderByWithRelationInput[] {
    const orderBy: Prisma.CourseOrderByWithRelationInput[] = [];

    switch (sortBy) {
      case 'createdAt':
        orderBy.push({ createdAt: sortOrder });
        break;
      case 'updatedAt':
        orderBy.push({ updatedAt: sortOrder });
        break;
      case 'title':
        orderBy.push({ title: sortOrder });
        break;
      case 'instructor':
        // Sort by instructor's first name, then last name
        orderBy.push({
          instructor: {
            user: {
              firstName: sortOrder,
            },
          },
        });
        orderBy.push({
          instructor: {
            user: {
              lastName: sortOrder,
            },
          },
        });
        break;
      default:
        // Default sort by creation date (newest first)
        orderBy.push({ createdAt: 'desc' });
        break;
    }

    return orderBy;
  }

  async create(
    data: Omit<ICreateCourse, 'categoryIds'>,
    categoryIds: string[],
    instructorId: string,
  ): Promise<Course> {
    return this.prisma.course.create({
      data: {
        ...data,
        instructorId,
        categories: {
          create: categoryIds.map((categoryId) => ({
            categoryId,
          })),
        },
      },
    });
  }

  async findAll(query: IFindAllCoursesQuery): Promise<Course[]> {
    const where = this.buildWhereClause(query);
    const orderBy = this.buildOrderByClause(query.sortBy, query.sortOrder);

    return this.prisma.course.findMany({
      where,
      orderBy,
      include: {
        instructor: {
          include: {
            user: true,
          },
        },
        sections: {
          take: 1,
          orderBy: { createdAt: 'asc' },
          include: {
            modules: {
              take: 1,
              orderBy: { createdAt: 'asc' },
            },
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async findById(
    id: string,
    query?: IFindOneCourseQuery,
  ): Promise<Course | null> {
    const include: Prisma.CourseInclude = {};

    if (query?.showInstructor) {
      include.instructor = { include: { user: true } };
    }

    if (query?.showSections) {
      include.sections = {
        include: {
          modules: {
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
      };
    }

    if (query?.showCategories) {
      include.categories = {
        include: {
          category: true,
        },
      };
    }

    return this.prisma.course.findUnique({
      where: { id },
      include: Object.keys(include).length > 0 ? include : undefined,
    });
  }

  async findByInstructorId(
    instructorId: string,
    query?: IFindOneCourseQuery,
  ): Promise<Course[] | null> {
    const include: Prisma.CourseInclude = {};
    const where: Prisma.CourseWhereInput = {
      instructorId,
    };

    if (query?.categoryId) {
      where.categories = {
        some: {
          categoryId: query.categoryId,
        },
      };
    }

    if (query?.showInstructor) {
      include.instructor = { include: { user: true } };
    }

    if (query?.showSections) {
      include.sections = {
        include: {
          modules: {
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
      };
    }

    if (query?.showCategories) {
      include.categories = {
        include: {
          category: true,
        },
      };
    }

    return this.prisma.course.findMany({
      where,
      include: Object.keys(include).length > 0 ? include : undefined,
    });
  }

  async findInstructorIdByCourseId(courseId: string): Promise<string | null> {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: { instructorId: true },
    });
    return course?.instructorId || null;
  }

  async update(
    id: string,
    data: Omit<IUpdateCourse, 'categoryIds'>,
    categoryIds?: string[],
  ): Promise<Course> {
    return this.prisma.$transaction(async (prisma) => {
      // If categoryIds are provided, delete the old relationships and create new ones
      if (categoryIds) {
        await prisma.coursesCategories.deleteMany({
          where: { courseId: id },
        });

        const newCategories = categoryIds.map((categoryId) => ({
          courseId: id,
          categoryId: categoryId,
        }));
        await prisma.coursesCategories.createMany({
          data: newCategories,
        });
      }

      // Update the main course data
      return prisma.course.update({
        where: { id },
        data: {
          ...data,
        },
      });
    });
  }

  async remove(id: string): Promise<Course> {
    return this.prisma.course.delete({
      where: { id },
    });
  }
}
