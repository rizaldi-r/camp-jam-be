import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/req/create-section.dto';
import { UpdateSectionDto } from './dto/req/update-section.dto';
import { SectionsRepository } from 'src/sections/sections.repository';
import { ResourceNotFoundException } from 'src/_common/exceptions/custom-not-found.exception';

@Injectable()
export class SectionsService {
  constructor(private readonly sectionsRepository: SectionsRepository) {}

  async isInstructorOwner(
    sectionId: string,
    instructorId: string,
  ): Promise<boolean> {
    const ownerId = await this.sectionsRepository.getOwnerId(sectionId);
    return ownerId === instructorId;
  }

  async create(createDto: CreateSectionDto) {
    return this.sectionsRepository.create(createDto);
  }

  async findAll() {
    return this.sectionsRepository.findAll();
  }

  async findAllByCourseId(courseId: string) {
    return this.sectionsRepository.findAllByCourseId(courseId);
  }

  async findById(id: string) {
    const section = await this.sectionsRepository.findById(id);
    if (!section) {
      throw new ResourceNotFoundException('Section', 'id', id);
    }
    return section;
  }

  async update(id: string, updateDto: UpdateSectionDto) {
    await this.findById(id);
    return this.sectionsRepository.update(id, updateDto);
  }

  async remove(id: string) {
    await this.findById(id);
    return this.sectionsRepository.remove(id);
  }
}
