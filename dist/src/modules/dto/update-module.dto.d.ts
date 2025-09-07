import { CreateLinkDto, CreateSubdescriptionDto } from './create-module.dto';
import { ModuleType } from '@prisma/client';
export declare class UpdateModuleDto {
    title?: string;
    moduleType?: ModuleType;
    embedVideoLink?: string;
    description?: string;
    links?: CreateLinkDto[];
    subdescriptions?: CreateSubdescriptionDto[];
}
