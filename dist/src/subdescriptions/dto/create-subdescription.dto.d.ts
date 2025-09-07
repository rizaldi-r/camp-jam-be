import { DescriptionType } from '@prisma/client';
export declare class CreateSubdescriptionDto {
    header: string;
    type: DescriptionType;
    description?: string;
    moduleId: string;
}
