import { Program } from '@prisma/client';
import { CategoryResponseDto } from 'src/categories/dto/res/categories-response.dto';
import { InstructorResponseDto } from 'src/instructors/dto/res/instructors-response-body.dto';
import { SectionResponseDto } from 'src/sections/dto/res/sections-response.dto';
export declare class CourseResponseDto {
    id: string;
    title: string;
    imageSrc: string | null;
    imageAlt: string | null;
    description: string | null;
    startDate: string | null;
    endDate: string | null;
    isMemberOnly: boolean;
    isLocked: boolean;
    instructorId: string;
    allowedPrograms: Program[];
    allowedBatchYears: number[];
    instructor?: InstructorResponseDto;
    sections?: SectionResponseDto[];
    categories?: {
        category: CategoryResponseDto;
    }[];
}
