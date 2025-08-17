// src/module/module.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Course, Module } from '@prisma/client';
import {
  CreateModuleData,
  UpdateModuleData,
} from 'src/modules/types/modules.repository.interface';

@Injectable()
export class ModulesRepository {
  constructor(private readonly prisma: PrismaService) {}

  // test search for parent
  async findCourseByModuleId(moduleId: string): Promise<Course | null> {
    const module = await this.prisma.module.findUnique({
      where: { id: moduleId },
      select: {
        section: {
          select: {
            course: true,
          },
        },
      },
    });
    return module?.section?.course || null;
  }

  async create(createData: CreateModuleData): Promise<Module> {
    const { subdescriptions, links, ...moduleData } = createData;
    return this.prisma.module.create({
      data: {
        ...moduleData,
        subdescriptions: {
          create: subdescriptions,
        },
        links: {
          create: links,
        },
      },
    });
  }

  async findByCourseId(courseId: string): Promise<Module[]> {
    return this.prisma.module.findMany({
      where: {
        section: {
          courseId: courseId,
        },
      },
      include: {
        links: true,
        subdescriptions: true,
        submissionTemplate: {
          include: {
            submissionFields: true,
          },
        },
      },
    });
  }

  async findBySectionId(sectionId: string): Promise<Module[]> {
    return this.prisma.module.findMany({
      where: { sectionId },
      include: {
        links: true,
        subdescriptions: true,
        submissionTemplate: {
          include: {
            submissionFields: true,
          },
        },
      },
    });
  }

  async findAll(sectionId?: string): Promise<Module[]> {
    return this.prisma.module.findMany({
      where: sectionId ? { sectionId } : {},
      include: {
        links: true,
        subdescriptions: true,
        submissionTemplate: {
          include: {
            submissionFields: true,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<Module | null> {
    return this.prisma.module.findUnique({
      where: { id },
      include: {
        links: true,
        subdescriptions: true,
        submissionTemplate: {
          include: {
            submissionFields: true,
          },
        },
      },
    });
  }

  async findInstructorIdByModuleId(moduleId: string): Promise<string | null> {
    const module = await this.prisma.module.findUnique({
      where: { id: moduleId },
      select: {
        section: {
          select: {
            course: {
              select: {
                instructorId: true,
              },
            },
          },
        },
      },
    });
    return module?.section?.course?.instructorId || null;
  }

  async update(id: string, updateData: UpdateModuleData): Promise<Module> {
    const { links, subdescriptions, ...moduleData } = updateData;

    // Use a transaction to ensure all updates are atomic
    return this.prisma.$transaction(async (prisma) => {
      // If links are provided, delete old ones and create new ones
      if (links) {
        await prisma.link.deleteMany({
          where: { moduleId: id },
        });
        await prisma.link.createMany({
          data: links.map((link) => ({ ...link, moduleId: id })),
        });
      }

      // If subdescriptions are provided, delete old ones and create new ones
      if (subdescriptions) {
        await prisma.subdescription.deleteMany({
          where: { moduleId: id },
        });
        await prisma.subdescription.createMany({
          data: subdescriptions.map((sub) => ({ ...sub, moduleId: id })),
        });
      }

      // Update the main module data.
      return prisma.module.update({
        where: { id },
        data: moduleData,
      });
    });
  }

  async remove(id: string): Promise<Module> {
    return this.prisma.module.delete({
      where: { id },
    });
  }
}
