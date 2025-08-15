// src/submission-template/submission-template.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, SubmissionTemplate } from '@prisma/client';
import {
  CreateSubmissionTemplateData,
  SubmissionTemplateRepositoryItf,
  UpdateSubmissionTemplateData,
} from 'src/submission-templates/types/submission-template.repository.interface';

@Injectable()
export class SubmissionTemplatesRepository
  implements SubmissionTemplateRepositoryItf
{
  constructor(private readonly prisma: PrismaService) {}
  async getOwnerId(id: string): Promise<string | null> {
    const template = await this.prisma.submissionTemplate.findUnique({
      where: { id },
      select: {
        module: {
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
        },
      },
    });
    return template?.module?.section?.course?.instructorId ?? null;
  }

  async create(
    data: CreateSubmissionTemplateData,
  ): Promise<SubmissionTemplate> {
    const { submissionFields, ...templateData } = data;
    return this.prisma.submissionTemplate.create({
      data: {
        ...templateData,
        submissionFields: {
          create: submissionFields,
        },
      },
      include: {
        submissionFields: true,
      },
    });
  }

  async findById(id: string): Promise<SubmissionTemplate | null> {
    return this.prisma.submissionTemplate.findUnique({
      where: { id },
      include: {
        submissionFields: true,
      },
    });
  }

  async findByModuleId(moduleId: string): Promise<SubmissionTemplate | null> {
    return this.prisma.submissionTemplate.findUnique({
      where: { moduleId },
      include: {
        submissionFields: true,
      },
    });
  }

  async findAll(): Promise<SubmissionTemplate[]> {
    return this.prisma.submissionTemplate.findMany({
      include: {
        submissionFields: true,
      },
    });
  }

  async update(
    id: string,
    data: UpdateSubmissionTemplateData,
  ): Promise<SubmissionTemplate> {
    const updateData: Prisma.SubmissionTemplateUpdateInput = {};

    if (data.submissionTitle) {
      updateData.submissionTitle = data.submissionTitle;
    }

    if (data.submissionFields) {
      await this.prisma.submissionField.deleteMany({
        where: { submissionTemplateId: id },
      });

      updateData.submissionFields = {
        create: data.submissionFields,
      };
    }

    return this.prisma.submissionTemplate.update({
      where: { id },
      data: updateData,
      include: {
        submissionFields: true,
      },
    });
  }

  async delete(id: string): Promise<SubmissionTemplate> {
    return this.prisma.submissionTemplate.delete({ where: { id } });
  }
}
