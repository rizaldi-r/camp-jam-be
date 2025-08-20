import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateModuleProgressDto } from './dto/create-module-progress.dto';
import { UpdateModuleProgressDto } from './dto/update-module-progress.dto';
import { ModuleProgress } from '@prisma/client';
import { ResourceNotFoundException } from 'src/_common/exceptions/custom-not-found.exception';

import { ModuleProgressRepository } from './module-progress.repository';
import { ModulesService } from 'src/modules/modules.service';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';

@Injectable()
export class ModuleProgressService {
  constructor(
    private readonly moduleProgressRepository: ModuleProgressRepository,
    @Inject(forwardRef(() => EnrollmentsService))
    private readonly enrollmentsService: EnrollmentsService,
    @Inject(forwardRef(() => ModulesService))
    private readonly modulesService: ModulesService,
  ) {}

  async isStudentOwner(id: string, studentId: string): Promise<boolean> {
    const ownerId = await this.moduleProgressRepository.getStudentOwnerId(id);
    return ownerId === studentId;
  }

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
    // Retrieve the existing module progress
    const existingProgress = await this.getModuleProgressById(id);

    // Check if the completion status is changing
    const isMarkingComplete =
      data.isCompleted === true && existingProgress.isCompleted === false;
    const isMarkingIncomplete =
      data.isCompleted === false && existingProgress.isCompleted === true;

    // This block runs only if the completion status is explicitly changing.
    if (isMarkingComplete || isMarkingIncomplete) {
      // Retrieve the associated enrollment and module for progress updates
      const enrollment = await this.enrollmentsService.getEnrollmentById(
        existingProgress.enrollmentId,
      );

      const module = await this.modulesService.findById(
        existingProgress.moduleId,
      );

      // Update the progress and handle the transaction for atomicity.
      // We pass a flag to the repository method to indicate if it's a completion or un-completion.
      const updatedProgress =
        await this.moduleProgressRepository.updateAndRecalculateProgress(
          id,
          data,
          module.moduleType,
          isMarkingComplete,
          enrollment.moduleProgress?.id,
          enrollment.lectureProgress?.id,
          enrollment.assignmentProgress?.id,
        );

      return updatedProgress;
    } else {
      // If there's no change in the completion status, or if the update doesn't include it,
      return this.moduleProgressRepository.update(id, data);
    }
  }

  async deleteModuleProgress(id: string): Promise<ModuleProgress> {
    await this.getModuleProgressById(id);
    return this.moduleProgressRepository.delete(id);
  }
}
