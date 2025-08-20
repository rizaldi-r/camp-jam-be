import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnrollmentData, ModuleProgress } from '@prisma/client';
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

  async updateAndRecalculateProgress(
    id: string,
    data: UpdateModuleProgressData,
    moduleType: string,
    isMarkingComplete: boolean,
    enrollmentModuleProgressId?: string,
    enrollmentLectureProgressId?: string,
    enrollmentAssignmentProgressId?: string,
  ): Promise<ModuleProgress> {
    const operation = isMarkingComplete ? 'increment' : 'decrement';

    return this.prisma.$transaction(async (prisma) => {
      // 1. Update the module progress record itself.
      const updatedModuleProgress = await prisma.moduleProgress.update({
        where: { id },
        data,
      });

      // 2. Update the main module progress record (moduleCompleted).
      const updatedEnrollmentModuleProgress =
        await prisma.enrollmentData.update({
          where: { id: enrollmentModuleProgressId },
          data: {
            moduleCompleted: {
              [operation]: 1,
            },
          },
        });

      // 3. Update the specific module type progress (lecture or assignment).
      let updatedModuleTypeProgress: EnrollmentData;
      let targetEnrollmentId: string | undefined;

      if (moduleType === 'LECTURE') {
        targetEnrollmentId = enrollmentLectureProgressId;
      } else if (moduleType === 'ASSIGNMENT') {
        targetEnrollmentId = enrollmentAssignmentProgressId;
      }

      if (targetEnrollmentId) {
        updatedModuleTypeProgress = await prisma.enrollmentData.update({
          where: { id: targetEnrollmentId },
          data: {
            moduleCompleted: {
              [operation]: 1,
            },
          },
        });

        // Recalculate and update the progress percentage for the specific module type.
        await prisma.enrollmentData.update({
          where: { id: targetEnrollmentId },
          data: {
            progressPercentage:
              (Number(updatedModuleTypeProgress.moduleCompleted) /
                Number(updatedModuleTypeProgress.moduleTotal)) *
              100,
          },
        });
      }

      // 4. Recalculate and update the progress percentage for the overall modules.
      await prisma.enrollmentData.update({
        where: { id: enrollmentModuleProgressId },
        data: {
          progressPercentage:
            (Number(updatedEnrollmentModuleProgress.moduleCompleted) /
              Number(updatedEnrollmentModuleProgress.moduleTotal)) *
            100,
        },
      });

      return updatedModuleProgress;
    });
  }
}
