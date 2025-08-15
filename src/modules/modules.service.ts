// src/module/module.service.ts
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundException } from '../_common/exceptions/custom-not-found.exception';
import { ModulesRepository } from 'src/modules/modules.repository';
import { CreateModuleDto } from 'src/modules/dto/create-module.dto';
import { UpdateModuleDto } from 'src/modules/dto/update-module.dto';

@Injectable()
export class ModulesService {
  constructor(private readonly modulesRepository: ModulesRepository) {}

  async isInstructorOwner(
    resourceId: string,
    userId: string,
  ): Promise<boolean> {
    const instructorId =
      await this.modulesRepository.findInstructorIdByModuleId(resourceId);
    return instructorId === userId;
  }

  // test
  async findCourseByModuleId(moduleId: string) {
    const course = await this.modulesRepository.findCourseByModuleId(moduleId);
    if (!course) {
      throw new ResourceNotFoundException('Course for Module', 'id', moduleId);
    }
    return course;
  }

  async create(createDto: CreateModuleDto) {
    const newModule = await this.modulesRepository.create(createDto);
    return newModule;
  }

  async findByCourse(courseId: string) {
    return this.modulesRepository.findByCourseId(courseId);
  }

  async findBySection(sectionId: string) {
    const modules = await this.modulesRepository.findBySectionId(sectionId);
    return modules;
  }

  async findAll(sectionId?: string) {
    const modules = await this.modulesRepository.findAll(sectionId);
    return modules;
  }

  async findById(id: string) {
    const module = await this.modulesRepository.findById(id);
    if (!module) {
      throw new ResourceNotFoundException('Module', 'id', id);
    }
    return module;
  }

  async update(id: string, updateDto: UpdateModuleDto) {
    await this.findById(id);

    const updatedModule = await this.modulesRepository.update(id, updateDto);
    return updatedModule;
  }

  async remove(id: string) {
    const module = await this.modulesRepository.findById(id);
    if (!module) {
      throw new ResourceNotFoundException('Module', 'id', id);
    }
    const removedModule = await this.modulesRepository.remove(id);
    return removedModule;
  }
}
