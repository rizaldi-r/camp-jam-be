import { ConflictException, Injectable } from '@nestjs/common';
import { CreateModuleProgressDto } from './dto/create-module-progress.dto';
import { UpdateModuleProgressDto } from './dto/update-module-progress.dto';
import { ModuleProgress } from '@prisma/client';
import { ResourceNotFoundException } from 'src/_common/exceptions/custom-not-found.exception';

import { ModuleProgressRepository } from './module-progress.repository';

@Injectable()
export class ModuleProgressService {
  constructor(
    private readonly moduleProgressRepository: ModuleProgressRepository,
  ) {}

  async isStudentOwner(id: string, studentId: string): Promise<boolean> {
    const ownerId = await this.moduleProgressRepository.getStudentOwnerId(id);
    return ownerId === studentId;
  }

  // async isInstructorOwner(id: string, instructorId: string): Promise<boolean> {
  //   const ownerId =
  //     await this.moduleProgressRepository.getInstructorOwnerId(id);
  //   return ownerId === instructorId;
  // }

  async createModuleProgress(
    data: CreateModuleProgressDto,
  ): Promise<ModuleProgress> {
    const existingProgress =
      await this.moduleProgressRepository.findByEnrollmentAndModule(
        data.enrollmentId,
        data.moduleId,
      );
    if (existingProgress) {
      throw new ConflictException(
        'Module progress for this enrollment and module already exists.',
      );
    }
    return this.moduleProgressRepository.create(data);
  }

  async getModuleProgressById(id: string): Promise<ModuleProgress> {
    const progress = await this.moduleProgressRepository.findById(id);
    if (!progress) {
      throw new ResourceNotFoundException('ModuleProgress', 'id', id);
    }
    return progress;
  }

  async getModuleProgressByEnrollmentId(
    enrollmentId: string,
  ): Promise<ModuleProgress[]> {
    return this.moduleProgressRepository.findByEnrollmentId(enrollmentId);
  }

  async getModuleProgressByModuleId(
    moduleId: string,
  ): Promise<ModuleProgress[]> {
    return this.moduleProgressRepository.findByModuleId(moduleId);
  }

  async getAllModuleProgress(): Promise<ModuleProgress[]> {
    return this.moduleProgressRepository.findAll();
  }

  async updateModuleProgress(
    id: string,
    data: UpdateModuleProgressDto,
  ): Promise<ModuleProgress> {
    await this.getModuleProgressById(id);
    return this.moduleProgressRepository.update(id, data);
  }

  async deleteModuleProgress(id: string): Promise<ModuleProgress> {
    await this.getModuleProgressById(id);
    return this.moduleProgressRepository.delete(id);
  }
}
