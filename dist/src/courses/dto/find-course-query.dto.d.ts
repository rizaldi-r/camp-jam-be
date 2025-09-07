import { Program } from '@prisma/client';
export declare enum SortBy {
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
    TITLE = "title"
}
export declare enum SortOrder {
    ASC = "asc",
    DESC = "desc"
}
export declare class FindAllCoursesQueryDto {
    title?: string;
    program?: Program;
    categoryId?: string;
    categoryName?: string;
    instructorId?: string;
    instructorName?: string;
    instructorUsername?: string;
    studentId?: string;
    studentName?: string;
    studentUsername?: string;
    sortBy?: SortBy;
    sortOrder?: SortOrder;
}
export declare class FindOneCourseDto {
    showInstructor?: boolean;
    showSections?: boolean;
    showCategories?: boolean;
    categoryId?: string;
}
