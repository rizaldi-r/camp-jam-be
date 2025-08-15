import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Submission } from '@prisma/client';
import {
  CreateSubmissionData,
  GradeSubmissionData,
  SubmissionRepositoryItf,
  UpdateSubmissionData,
} from 'src/submissions/types/submissions.repository.interface';

@Injectable()
export class SubmissionsRepository implements SubmissionRepositoryItf {
  constructor(private readonly prisma: PrismaService) {}

  async getOwnerId(id: string): Promise<string | null> {
    const submission = await this.prisma.submission.findUnique({
      where: { id },
      select: {
        studentId: true,
      },
    });
    return submission?.studentId ?? null;
  }

  // enrollement
  async getCourseOwnerId(id: string): Promise<string | null> {
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
    const { submittedContents, ...submissionData } = data;
    return this.prisma.submission.create({
      data: {
        ...submissionData,
        submittedContents: {
          create: submittedContents,
        },
      },
      include: {
        submittedContents: true,
      },
    });
  }

  async findById(id: string): Promise<Submission | null> {
    return this.prisma.submission.findUnique({
      where: { id },
      include: {
        submittedContents: true,
      },
    });
  }

  async findAll(): Promise<Submission[]> {
    return this.prisma.submission.findMany({
      include: {
        submittedContents: true,
      },
    });
  }

  async update(
    id: string,
    data: UpdateSubmissionData | GradeSubmissionData,
  ): Promise<Submission> {
    const updateData: Prisma.SubmissionUpdateInput = {};

    // Handle student submission update
    if ('submittedContents' in data && data.submittedContents) {
      await this.prisma.submissionFieldValue.deleteMany({
        where: { submissionId: id },
      });
      updateData.submittedContents = {
        create: data.submittedContents,
      };
    }

    // Handle instructor grading update
    if ('isGraded' in data) {
      updateData.isGraded = data.isGraded;
      updateData.isPassed = data.isPassed;
      updateData.scorePercentage = data.scorePercentage;
      updateData.scoreAchieved = data.scoreAchieved;
      updateData.scoreTotal = data.scoreTotal;
      updateData.feedback = data.feedback;
    }

    return this.prisma.submission.update({
      where: { id },
      data: updateData,
      include: {
        submittedContents: true,
      },
    });
  }

  async delete(id: string): Promise<Submission> {
    return this.prisma.submission.delete({ where: { id } });
  }
}
