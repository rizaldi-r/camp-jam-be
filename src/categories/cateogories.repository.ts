import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category, Prisma } from '@prisma/client';
import {
  CreateCategoryItf,
  FindAllCategoriesItf,
  UpdateCategoryItf,
} from 'src/categories/types/cateogories.repository.interfaces';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryItf): Promise<Category> {
    return this.prisma.category.create({ data });
  }

  // async createMany(data: CreateCategoryItf): Promise<Category> {
  //   await this.prisma.coursesCategories.createMany({
  //     data: newCategories,
  //   });
  // }

  async findAll(query: FindAllCategoriesItf): Promise<Category[]> {
    const { name, program } = query;
    const where: Prisma.CategoryWhereInput = {};

    if (name) {
      where.name = { contains: name, mode: 'insensitive' };
    }

    if (program) {
      // search for one of the item from enum
      where.programs = { has: program };
    }

    return this.prisma.category.findMany({ where });
  }

  async findById(id: string): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  async findByIdList(ids: string[]): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: { id: { in: ids } },
    });
  }

  async update(id: string, data: UpdateCategoryItf): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Category> {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
