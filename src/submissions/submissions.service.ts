/**
 * Submissions Service
 *
 * This class contains the business logic for the Submission entity.
 * It uses the repository to perform database operations and handles
 * validation and error throwing.
 */

import { Injectable } from '@nestjs/common';
import { Submission } from '@prisma/client';
import { ResourceNotFoundException } from 'src/_common/exceptions/custom-not-found.exception';
import { CreateSubmissionDto } from 'src/submissions/dto/create-submission.dto';
import {
  GradeSubmissionDto,
  UpdateSubmissionDto,
} from 'src/submissions/dto/update-submission.dto';
import { SubmissionsRepository } from 'src/submissions/submissions.repository';

@Injectable()
export class SubmissionsService {
  constructor(private readonly submissionsRepository: SubmissionsRepository) {}

  async isStudentOwner(
    submissionId: string,
    studentId: string,
  ): Promise<boolean> {
    const ownerId = await this.submissionsRepository.getOwnerId(submissionId);
    return ownerId === studentId;
  }

  async isInstructorOwner(
    submissionId: string,
    instructorId: string,
  ): Promise<boolean> {
    const courseOwnerId =
      await this.submissionsRepository.getCourseOwnerId(submissionId);
    return courseOwnerId === instructorId;
  }

  async createSubmission(data: CreateSubmissionDto): Promise<Submission> {
    return this.submissionsRepository.create(data);
  }

  async getSubmissionById(id: string): Promise<Submission> {
    const submission = await this.submissionsRepository.findById(id);
    if (!submission) {
      throw new ResourceNotFoundException('Submission', 'id', id);
    }
    return submission;
  }

  async getAllSubmissions(): Promise<Submission[]> {
    return this.submissionsRepository.findAll();
  }

  async updateSubmission(
    id: string,
    data: UpdateSubmissionDto,
  ): Promise<Submission> {
    await this.getSubmissionById(id);
    return this.submissionsRepository.update(id, data);
  }

  async deleteSubmission(id: string): Promise<Submission> {
    await this.getSubmissionById(id);
    return this.submissionsRepository.delete(id);
  }

  async gradeSubmission(
    id: string,
    data: GradeSubmissionDto,
  ): Promise<Submission> {
    await this.getSubmissionById(id);
    return this.submissionsRepository.update(id, data);
  }
}
