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
      instructorUsername,
    } = query;
    const where: Prisma.CourseWhereInput = {};

    if (title) {
      where.title = { contains: title, mode: 'insensitive' };
    }

    if (program) {
      where.allowedPrograms = { hasSome: [program] };
    }

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

    if (instructorId) {
      where.instructorId = instructorId;
    } else if (instructorUsername) {
      where.instructor = {
        user: {
          username: {
            contains: instructorUsername,
            mode: 'insensitive',
          },
        },
      };
    }

    return this.prisma.course.findMany({
      where,
      include: {
        instructor: {
          include: {
            user: true,
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
          modules: true,
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
