import { DescriptionType, ModuleType } from '@prisma/client';
export declare class SubmissionFieldDto {
    id: string;
    label: string;
    isTextfield: boolean;
    submissionTemplateId: string;
    createdAt: string;
    updatedAt: string;
}
export declare class SubmissionTemplateDto {
    id: string;
    moduleId: string;
    submissionTitle: string;
    endDate: string | null;
    scoreTotal: number;
    createdAt: string;
    updatedAt: string;
    submissionFields: SubmissionFieldDto[];
}
export declare class ModuleLinkDto {
    id: string;
    label: string;
    href: string;
    moduleId: string;
    createdAt: string;
    updatedAt: string;
}
export declare class ModuleSubdescriptionDto {
    id: string;
    header: string;
    type: DescriptionType;
    description: string;
    moduleId: string;
    createdAt: string;
    updatedAt: string;
}
export declare class ModuleResponseDto {
    id: string;
    moduleType: ModuleType;
    embedVideoLink: string | null;
    title: string;
    description: string;
    sectionId: string;
    createdAt: string;
    updatedAt: string;
    links: ModuleLinkDto[];
    subdescriptions: ModuleSubdescriptionDto[];
    submissionTemplate: SubmissionTemplateDto | null;
}
