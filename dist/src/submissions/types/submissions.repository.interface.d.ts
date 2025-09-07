import { Prisma, Submission } from '@prisma/client';
export interface CreateSubmissionData {
    studentId: string;
    enrollmentId: string;
    moduleId: string;
    submissionTemplateId: string;
    submissionFieldValueData: {
        submissionFieldId: string;
        submitted?: string;
    }[];
}
export interface UpdateSubmissionData {
    submissionFieldValueData?: {
        submissionFieldId: string;
        submitted?: string;
    }[];
}
export interface GradeSubmissionData {
    isPassed?: boolean;
    isGraded: boolean;
    scoreAchieved?: Prisma.Decimal;
    scorePercentage?: Prisma.Decimal;
    feedback?: string;
}
export interface LockSubmissionData {
    isLocked: boolean;
}
export interface SubmissionRepositoryItf {
    create(data: CreateSubmissionData): Promise<Submission>;
    findById(id: string): Promise<Submission | null>;
    findAll(): Promise<Submission[]>;
    update(id: string, data: UpdateSubmissionData | GradeSubmissionData | LockSubmissionData): Promise<Submission>;
    delete(id: string): Promise<Submission>;
    getStudentId(id: string): Promise<string | null>;
    getInstructorId(id: string): Promise<string | null>;
}
