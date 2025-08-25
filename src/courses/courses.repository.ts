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
    const {
      title,
      program,
      categoryId,
      categoryName,
      instructorId,
      instructorName,
      sortBy,
      sortOrder = 'desc',
    } = query;

    const where: Prisma.CourseWhereInput = {};
    const orderBy: Prisma.CourseOrderByWithRelationInput[] = [];

    // Filter by course title (case-insensitive)
    if (title) {
      where.title = { contains: title, mode: 'insensitive' };
    }

    // Filter by allowed program.
    // The `hasSome` filter is used for an array of strings.
    if (program) {
      where.allowedPrograms = { hasSome: [program] };
    }

    // Filter by category ID. If not provided, try filtering by category name.
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

    // Filter by instructor ID. If not provided, try filtering by instructor username.
    if (instructorId) {
      where.instructorId = instructorId;
    } else if (instructorName) {
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
          ],
        },
      };
    }

    // Apply sorting logic based on the 'sortBy' parameter.
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
      default:
        // Default sort by createdAt if no sortBy is specified.
        orderBy.push({ createdAt: 'desc' });
        break;
    }

    // Return the results with nested data and sorting applied.
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
          include: { modules: { take: 1, orderBy: { createdAt: 'asc' } } },
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
