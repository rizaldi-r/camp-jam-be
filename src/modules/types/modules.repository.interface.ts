import {
  DescriptionType,
  Module,
  ModuleType,
  SubmissionTemplate,
} from '@prisma/client';

export interface LinkData {
  label: string;
  href: string;
}

export interface SubdescriptionData {
  header: string;
  type?: DescriptionType;
  description?: string;
}

export interface CreateModuleData {
  title: string;
  moduleType: ModuleType;
  embedVideoLink?: string;
  description?: string;
  sectionId: string;
  links?: LinkData[];
  subdescriptions?: SubdescriptionData[];
}

export interface UpdateModuleData {
  title?: string;
  moduleType?: ModuleType;
  embedVideoLink?: string;
  description?: string;
  links?: LinkData[];
  subdescriptions?: SubdescriptionData[];
}

export type ModuleWithChildrens = Module & {
  links: any[];
  subdescriptions: any[];
  submissionTemplate: (SubmissionTemplate & { submissionFields: any[] }) | null;
};
