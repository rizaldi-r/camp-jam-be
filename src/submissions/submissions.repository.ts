import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Submission, SubmissionFieldValue } from '@prisma/client';
import {
  CreateSubmissionData,
  GradeSubmissionData,
  LockSubmissionData,
  SubmissionRepositoryItf,
  UpdateSubmissionData,
} from 'src/submissions/types/submissions.repository.interface';

@Injectable()
export class SubmissionsRepository implements SubmissionRepositoryItf {
  constructor(private readonly prisma: PrismaService) {}

  async getStudentId(id: string): Promise<string | null> {
    const submission = await this.prisma.submission.findUnique({
      where: { id },
      select: {
        studentId: true,
      },
    });
    return submission?.studentId ?? null;
  }

  async getInstructorId(id: string): Promise<string | null> {
    const submission = await this.prisma.submission.findUnique({
      where: { id },
      select: {
        enrollment: {
          select: {
            instructorId: true,
          },
        },
      },
    });
    return submission?.enrollment?.instructorId ?? null;
  }

  async create(data: CreateSubmissionData): Promise<Submission> {
    const { submissionFieldValueData, ...submissionData } = data;
    return this.prisma.submission.create({
      data: {
        ...submissionData,
        submissionFieldValue: {
          create: submissionFieldValueData,
        },
      },
      include: {
        submissionFieldValue: { include: { submissionField: true } },
      },
    });
  }

  async findById(id: string): Promise<Submission | null> {
    return this.prisma.submission.findUnique({
      where: { id },
      include: {
        submissionFieldValue: { include: { submissionField: true } },
      },
    });
  }

  async findAll(): Promise<Submission[]> {
    return this.prisma.submission.findMany({
      include: {
        submissionFieldValue: { include: { submissionField: true } },
      },
    });
  }

  async findByEnrollmentId(enrollmentId: string): Promise<Submission[]> {
    return this.prisma.submission.findMany({
      where: {
        enrollmentId,
      },
      include: {
        submissionFieldValue: { include: { submissionField: true } },
      },
    });
  }

  // TODO: seperate this
  async update(
    id: string,
    data: UpdateSubmissionData | GradeSubmissionData | LockSubmissionData,
  ): Promise<Submission> {
    const updateData: Prisma.SubmissionUpdateInput = {};

    // Handle student submission update
    if ('submissionFieldValueData' in data && data.submissionFieldValueData) {
      await this.prisma.submissionFieldValue.deleteMany({
        where: { submissionId: id },
      });
      updateData.submissionFieldValue = {
        create: data.submissionFieldValueData,
      };
    }

    // Handle instructor grading update
    if ('isGraded' in data) {
      updateData.isGraded = data.isGraded;
      updateData.isPassed = data.isPassed;
      updateData.scorePercentage = data.scorePercentage;
      updateData.scoreAchieved = data.scoreAchieved;
      updateData.feedback = data.feedback;
    }

    // Handle instructor locking/unlocking update
    if ('isLocked' in data) {
      updateData.isLocked = data.isLocked;
    }

    return this.prisma.submission.update({
      where: { id },
      data: updateData,
      include: {
        submissionFieldValue: { include: { submissionField: true } },
      },
    });
  }

  async lockAllByModuleId(moduleId: string, isLocked: boolean): Promise<void> {
    await this.prisma.submission.updateMany({
      where: {
        moduleId,
      },
      data: {
        isLocked,
      },
    });
  }

  async lockAllByTemplateId(
    templateId: string,
    isLocked: boolean,
  ): Promise<void> {
    await this.prisma.submission.updateMany({
      where: { submissionTemplateId: templateId },
      data: { isLocked },
    });
  }

  async delete(id: string): Promise<Submission> {
    return this.prisma.submission.delete({ where: { id } });
  }

  //----- SubmissionFieldValue -------

  async findFieldValuesBySubmissionId(
    submissionId: string,
  ): Promise<SubmissionFieldValue[]> {
    return this.prisma.submissionFieldValue.findMany({
      where: { submissionId },
    });
  }
}
