import { Prisma, Submission } from '@prisma/client';

export interface CreateSubmissionData {
  studentId: string;
  enrollmentId: string;
  moduleId: string;
  submissionTemplateId: string;
  submittedContents: {
    submissionFieldId: string;
    submitted: string;
  }[];
}

export interface UpdateSubmissionData {
  submittedContents?: {
    submissionFieldId: string;
    submitted: string;
  }[];
}

export interface GradeSubmissionData {
  isGraded: boolean;
  isPassed?: boolean;
  scorePercentage?: Prisma.Decimal;
  scoreAchieved?: Prisma.Decimal;
  scoreTotal?: number;
  feedback?: string;
}

export interface SubmissionRepositoryItf {
  create(data: CreateSubmissionData): Promise<Submission>;
  findById(id: string): Promise<Submission | null>;
  findAll(): Promise<Submission[]>;
  update(
    id: string,
    data: UpdateSubmissionData | GradeSubmissionData,
  ): Promise<Submission>;
  delete(id: string): Promise<Submission>;
  getOwnerId(id: string): Promise<string | null>;
  getCourseOwnerId(id: string): Promise<string | null>;
}
