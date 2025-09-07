import { PrismaService } from 'src/prisma/prisma.service';
import { Submission, SubmissionFieldValue } from '@prisma/client';
import { CreateSubmissionData, GradeSubmissionData, LockSubmissionData, SubmissionRepositoryItf, UpdateSubmissionData } from 'src/submissions/types/submissions.repository.interface';
export declare class SubmissionsRepository implements SubmissionRepositoryItf {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getStudentId(id: string): Promise<string | null>;
    getInstructorId(id: string): Promise<string | null>;
    create(data: CreateSubmissionData): Promise<Submission>;
    findById(id: string): Promise<Submission | null>;
    findAll(): Promise<Submission[]>;
    findByEnrollmentId(enrollmentId: string): Promise<Submission[]>;
    update(id: string, data: UpdateSubmissionData | GradeSubmissionData | LockSubmissionData): Promise<Submission>;
    lockAllByModuleId(moduleId: string, isLocked: boolean): Promise<void>;
    lockAllByTemplateId(templateId: string, isLocked: boolean): Promise<void>;
    delete(id: string): Promise<Submission>;
    findFieldValuesBySubmissionId(submissionId: string): Promise<SubmissionFieldValue[]>;
}
