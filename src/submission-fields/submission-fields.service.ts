import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubmissionFieldDto } from './dto/create-submission-field.dto';
import { UpdateSubmissionFieldDto } from './dto/update-submission-field.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubmissionFieldsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSubmissionFieldDto) {
    return this.prisma.submissionField.create({
      data,
    });
  }

  async findAll(submissionTemplateId?: string) {
    const where = submissionTemplateId ? { submissionTemplateId } : undefined;
    return this.prisma.submissionField.findMany({
      where,
    });
  }

  async findOne(id: string) {
    const submissionField = await this.prisma.submissionField.findUnique({
      where: { id },
    });

    if (!submissionField) {
      throw new NotFoundException(`SubmissionField with ID "${id}" not found`);
    }

    return submissionField;
  }

  async update(id: string, data: UpdateSubmissionFieldDto) {
    await this.findOne(id);
    return await this.prisma.submissionField.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.submissionField.delete({
      where: { id },
    });
  }
}
