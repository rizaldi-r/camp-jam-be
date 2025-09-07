import { Submission, SubmissionFieldValue } from '@prisma/client';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
import { SubmissionTemplatesService } from 'src/submission-templates/submission-templates.service';
import { CreateSubmissionDto } from 'src/submissions/dto/create-submission.dto';
import { GradeSubmissionDto, LockSubmissionDto, UpdateSubmissionDto } from 'src/submissions/dto/update-submission.dto';
import { SubmissionsRepository } from 'src/submissions/submissions.repository';
export declare class SubmissionsService {
    private readonly submissionsRepository;
    private readonly submissionTemplatesService;
    private readonly enrollmentsService;
    constructor(submissionsRepository: SubmissionsRepository, submissionTemplatesService: SubmissionTemplatesService, enrollmentsService: EnrollmentsService);
    isStudentOwner(submissionId: string, studentId: string): Promise<boolean>;
    isInstructorOwner(submissionId: string, instructorId: string): Promise<boolean>;
    createSubmission(studentId: string, data: CreateSubmissionDto): Promise<Submission>;
    getSubmissionById(id: string): Promise<Submission>;
    getAllSubmissions(): Promise<Submission[]>;
    getSubmissionsByEnrollmentId(enrollmentId: string): Promise<Submission[]>;
    updateSubmission(id: string, data: UpdateSubmissionDto): Promise<Submission>;
    gradeSubmission(id: string, data: GradeSubmissionDto): Promise<Submission>;
    lockSubmission(id: string, lockData: LockSubmissionDto): Promise<Submission>;
    lockSubmissionsByModuleId(moduleId: string, isLocked: boolean): Promise<void>;
    lockSubmissionsByTemplateId(templateId: string, isLocked: boolean): Promise<void>;
    deleteSubmission(id: string): Promise<Submission>;
    getSubmissionFieldValues(submissionId: string): Promise<SubmissionFieldValue[]>;
}
