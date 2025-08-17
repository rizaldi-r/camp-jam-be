// src/submission-template/submission-template.service.ts

import { Injectable } from '@nestjs/common';
import { SubmissionField, SubmissionTemplate } from '@prisma/client';
import { ResourceNotFoundException } from 'src/_common/exceptions/custom-not-found.exception';
import { CreateSubmissionTemplateDto } from 'src/submission-templates/dto/create-submission-template.dto';
import { UpdateSubmissionTemplateDto } from 'src/submission-templates/dto/update-submission-template.dto';
import { SubmissionTemplatesRepository } from 'src/submission-templates/submission-template.repository';

@Injectable()
export class SubmissionTemplatesService {
  constructor(
    private readonly submissionTemplatesRepository: SubmissionTemplatesRepository,
  ) {}
  async isInstructorOwner(
    templateId: string,
    instructorId: string,
  ): Promise<boolean> {
    const ownerId =
      await this.submissionTemplatesRepository.getOwnerId(templateId);
    return ownerId === instructorId;
  }

  async createTemplate(
    data: CreateSubmissionTemplateDto,
  ): Promise<SubmissionTemplate> {
    return this.submissionTemplatesRepository.create(data);
  }

  async getAllTemplates(): Promise<SubmissionTemplate[]> {
    return this.submissionTemplatesRepository.findAll();
  }

  async getTemplateById(id: string): Promise<SubmissionTemplate> {
    const template = await this.submissionTemplatesRepository.findById(id);
    if (!template) {
      throw new ResourceNotFoundException('SubmissionTemplate', 'id', id);
    }
    return template;
  }

  async getTemplateByModuleId(moduleId: string): Promise<SubmissionTemplate> {
    const template =
      await this.submissionTemplatesRepository.findByModuleId(moduleId);
    if (!template) {
      throw new ResourceNotFoundException(
        'SubmissionTemplate',
        'moduleId',
        moduleId,
      );
    }
    return template;
  }

  async getTemplateByCourseId(courseId: string): Promise<SubmissionTemplate[]> {
    const template =
      await this.submissionTemplatesRepository.findByCourseId(courseId);
    if (!template) {
      throw new ResourceNotFoundException(
        'SubmissionTemplate',
        'courseId',
        courseId,
      );
    }
    return template;
  }

  async getSubmissionFieldsByTemplateId(
    templateId: string,
  ): Promise<SubmissionField[]> {
    await this.getTemplateById(templateId);
    return this.submissionTemplatesRepository.findFieldsByTemplateId(
      templateId,
    );
  }

  async updateTemplate(
    id: string,
    data: UpdateSubmissionTemplateDto,
  ): Promise<SubmissionTemplate> {
    await this.getTemplateById(id);
    return this.submissionTemplatesRepository.update(id, data);
  }

  async deleteTemplate(id: string): Promise<SubmissionTemplate> {
    await this.getTemplateById(id);
    return this.submissionTemplatesRepository.delete(id);
  }
}
