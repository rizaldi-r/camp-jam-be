import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ModuleProgress } from '@prisma/client';
import {
  CreateModuleProgressData,
  ModuleProgressRepositoryItf,
  UpdateModuleProgressData,
} from 'src/module-progress/types/module-progress.controller.interface';

@Injectable()
export class ModuleProgressRepository implements ModuleProgressRepositoryItf {
  constructor(private readonly prisma: PrismaService) {}

  async getStudentOwnerId(id: string): Promise<string | null> {
    const progress = await this.prisma.moduleProgress.findUnique({
      where: { id },
      select: {
        enrollment: {
          select: {
            studentId: true,
          },
        },
      },
    });
    return progress?.enrollment?.studentId ?? null;
  }

  async getInstructorOwnerId(id: string): Promise<string | null> {
    const progress = await this.prisma.moduleProgress.findUnique({
      where: { id },
      select: {
        enrollment: {
          select: {
            instructorId: true,
          },
        },
      },
    });
    return progress?.enrollment?.instructorId ?? null;
  }

  async create(data: CreateModuleProgressData): Promise<ModuleProgress> {
    return this.prisma.moduleProgress.create({
      data,
    });
  }

  async findById(id: string): Promise<ModuleProgress | null> {
    return this.prisma.moduleProgress.findUnique({
      where: { id },
    });
  }

  async findByEnrollmentAndModule(
    enrollmentId: string,
    moduleId: string,
  ): Promise<ModuleProgress | null> {
    return this.prisma.moduleProgress.findUnique({
      where: {
        enrollmentId_moduleId: {
          enrollmentId,
          moduleId,
        },
      },
    });
  }

  async findByEnrollmentId(enrollmentId: string): Promise<ModuleProgress[]> {
    return this.prisma.moduleProgress.findMany({
      where: {
        enrollmentId,
      },
    });
  }

  async findByModuleId(moduleId: string): Promise<ModuleProgress[]> {
    return this.prisma.moduleProgress.findMany({
      where: {
        moduleId,
      },
    });
  }

  async findAll(): Promise<ModuleProgress[]> {
    return this.prisma.moduleProgress.findMany();
  }

  async update(
    id: string,
    data: UpdateModuleProgressData,
  ): Promise<ModuleProgress> {
    return this.prisma.moduleProgress.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<ModuleProgress> {
    return this.prisma.moduleProgress.delete({ where: { id } });
  }
}
