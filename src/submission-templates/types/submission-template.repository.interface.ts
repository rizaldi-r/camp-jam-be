import { SubmissionTemplate } from '@prisma/client';

// Interfaces for the data used in repository methods
export interface CreateSubmissionTemplateData {
  submissionTitle: string;
  moduleId: string;
  submissionFields?: {
    label: string;
    isTextfield: boolean;
  }[];
}

export interface UpdateSubmissionTemplateData {
  submissionTitle?: string;
  submissionFields?: {
    label: string;
    isTextfield?: boolean;
  }[];
}

export interface SubmissionTemplateRepositoryItf {
  create(data: CreateSubmissionTemplateData): Promise<SubmissionTemplate>;
  findById(id: string): Promise<SubmissionTemplate | null>;
  findByModuleId(moduleId: string): Promise<SubmissionTemplate | null>;
  findAll(): Promise<SubmissionTemplate[]>;
  update(
    id: string,
    data: UpdateSubmissionTemplateData,
  ): Promise<SubmissionTemplate>;
  delete(id: string): Promise<SubmissionTemplate>;
}
