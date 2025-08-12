import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Course, Prisma } from '@prisma/client';
import {
  ICreateCourse,
  IFindAllCoursesQuery,
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
    // Create the Course and the CourseCategory relationship in a single transaction
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
    const { title, program, categoryId, instructorId } = query;
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
    }

    if (instructorId) {
      where.instructorId = instructorId;
    }

    // show everything
    return this.prisma.course.findMany({ where });
  }

  async findById(id: string): Promise<Course | null> {
    return this.prisma.course.findUnique({
      where: { id },
    });
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
