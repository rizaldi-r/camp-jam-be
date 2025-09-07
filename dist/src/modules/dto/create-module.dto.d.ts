import { DescriptionType, ModuleType } from '@prisma/client';
import { CreateSubmissionFieldDto } from 'src/submission-templates/dto/create-submission-template.dto';
export declare class CreateLinkDto {
    label: string;
    href: string;
}
export declare class CreateSubdescriptionDto {
    header: string;
    type?: DescriptionType;
    description?: string;
}
declare class CreateSubmissionTemplateDto {
    submissionTitle: string;
    submissionFields: CreateSubmissionFieldDto[];
}
export declare class CreateModuleDto {
    title: string;
    moduleType: ModuleType;
    embedVideoLink?: string;
    description?: string;
    sectionId: string;
    subdescriptions?: CreateSubdescriptionDto[];
    links?: CreateLinkDto[];
    submissionTemplate?: CreateSubmissionTemplateDto;
}
export {};
