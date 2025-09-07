import { Program } from '@prisma/client';
export declare class UpdateCourseDto {
    title?: string;
    imageSrc?: string;
    imageAlt?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    isMemberOnly?: boolean;
    isLocked?: boolean;
    instructorId?: string;
    allowedPrograms?: Program[];
    allowedBatchYears?: number[];
    categoryIds?: string[];
}
