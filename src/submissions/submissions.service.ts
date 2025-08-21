import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, Submission, SubmissionFieldValue } from '@prisma/client';
import { ResourceNotFoundException } from 'src/_common/exceptions/custom-not-found.exception';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
import { SubmissionTemplatesService } from 'src/submission-templates/submission-templates.service';
import { CreateSubmissionDto } from 'src/submissions/dto/create-submission.dto';
import {
  GradeSubmissionDto,
  LockSubmissionDto,
  UpdateSubmissionDto,
} from 'src/submissions/dto/update-submission.dto';
import { SubmissionsRepository } from 'src/submissions/submissions.repository';

@Injectable()
export class SubmissionsService {
  constructor(
    private readonly submissionsRepository: SubmissionsRepository,
    private readonly submissionTemplatesService: SubmissionTemplatesService,
    private readonly enrollmentsService: EnrollmentsService,
  ) {}

  async isStudentOwner(
    submissionId: string,
    studentId: string,
  ): Promise<boolean> {
    const ownerId = await this.submissionsRepository.getStudentId(submissionId);
    return ownerId === studentId;
  }

  async isInstructorOwner(
    submissionId: string,
    instructorId: string,
  ): Promise<boolean> {
    const courseOwnerId =
      await this.submissionsRepository.getInstructorId(submissionId);
    return courseOwnerId === instructorId;
  }

  async createSubmission(
    studentId: string,
    data: CreateSubmissionDto,
  ): Promise<Submission> {
    const submissionTemplate =
      await this.submissionTemplatesService.getTemplateByModuleId(
        data.moduleId,
      );
    const finalData = {
      ...data,
      studentId,
      submissionTemplateId: submissionTemplate.id,
    };
    return this.submissionsRepository.create(finalData);
  }

  async getSubmissionById(id: string): Promise<Submission> {
    const submission = await this.submissionsRepository.findById(id);
    if (!submission) {
      throw new ResourceNotFoundException('Submission', 'id', id);
    }
    return submission;
  }

  async getAllSubmissions(): Promise<Submission[]> {
    return await this.submissionsRepository.findAll();
  }

  async getSubmissionsByEnrollmentId(
    enrollmentId: string,
  ): Promise<Submission[]> {
    return await this.submissionsRepository.findByEnrollmentId(enrollmentId);
  }

  async updateSubmission(
    id: string,
    data: UpdateSubmissionDto,
  ): Promise<Submission> {
    const submission = await this.getSubmissionById(id);
    if (submission.isLocked) {
      throw new UnauthorizedException(
        'This submission is locked and cannot be updated.',
      );
    }
    return this.submissionsRepository.update(id, data);
  }

  async gradeSubmission(
    id: string,
    data: GradeSubmissionDto,
  ): Promise<Submission> {
    const { scoreAchieved, ...otherData } = data;

    await this.getSubmissionById(id);

    // 1. Fetch the submission and its related data to get the total score and enrollment ID.
    const submission = await this.getSubmissionById(id);
    const submissionTemplate =
      await this.submissionTemplatesService.getTemplateByModuleId(
        submission.moduleId,
      );

    const scoreTotal = submissionTemplate.scoreTotal;

    // 2. Calculate the score percentage and update the submission.
    const scorePercentage =
      scoreTotal > 0 ? (scoreAchieved / scoreTotal) * 100 : 0;

    const updatedSubmission = await this.submissionsRepository.update(id, {
      ...otherData,
      isGraded: true,
      scoreAchieved: new Prisma.Decimal(scoreAchieved),
      scorePercentage: new Prisma.Decimal(scorePercentage),
    });

    // 3. update enrollment data
    await this.enrollmentsService.updateEnrollmentProgressAfterGrading(id);

    return updatedSubmission;
  }

  async lockSubmission(
    id: string,
    lockData: LockSubmissionDto,
  ): Promise<Submission> {
    await this.getSubmissionById(id);
    return this.submissionsRepository.update(id, lockData);
  }

  async lockSubmissionsByModuleId(
    moduleId: string,
    isLocked: boolean,
  ): Promise<void> {
    await this.submissionsRepository.lockAllByModuleId(moduleId, isLocked);
  }

  async lockSubmissionsByTemplateId(
    templateId: string,
    isLocked: boolean,
  ): Promise<void> {
    await this.submissionsRepository.lockAllByTemplateId(templateId, isLocked);
  }

  async deleteSubmission(id: string): Promise<Submission> {
    await this.getSubmissionById(id);
    return this.submissionsRepository.delete(id);
  }

  //----- SubmissionFieldValue -------

  async getSubmissionFieldValues(
    submissionId: string,
  ): Promise<SubmissionFieldValue[]> {
    await this.getSubmissionById(submissionId);
    return this.submissionsRepository.findFieldValuesBySubmissionId(
      submissionId,
    );
  }
}
