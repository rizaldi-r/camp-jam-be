import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Section } from '@prisma/client';
import {
  CreateSectionItf,
  UpdateSectionItf,
} from 'src/sections/types/sections.repository.interface';

@Injectable()
export class SectionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSectionItf): Promise<Section> {
    return this.prisma.section.create({ data });
  }

  async findAll(): Promise<Section[]> {
    return this.prisma.section.findMany();
  }

  async findAllByCourseId(courseId: string): Promise<Section[]> {
    return this.prisma.section.findMany({
      where: { courseId },
      include: {
        modules: true,
      },
    });
  }

  async findById(id: string): Promise<Section | null> {
    return this.prisma.section.findUnique({
      where: { id },
      include: {
        modules: true,
      },
    });
  }

  async getOwnerId(sectionId: string): Promise<string | null> {
    const sectionWithCourse = await this.prisma.section.findUnique({
      where: { id: sectionId },
      select: {
        course: {
          select: {
            instructorId: true,
          },
        },
      },
    });
    return sectionWithCourse?.course?.instructorId || null;
  }

  async update(id: string, data: UpdateSectionItf): Promise<Section> {
    return this.prisma.section.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Section> {
    return this.prisma.section.delete({
      where: { id },
    });
  }
}
