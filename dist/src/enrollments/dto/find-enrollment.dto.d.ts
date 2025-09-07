import { SortBy, SortOrder } from 'src/courses/dto/find-course-query.dto';
import { SearchBy } from 'src/enrollments/types/enrollments.repository.interface';
export declare class SearchDataDto {
    searchQuery: string;
    searchBy: SearchBy;
}
export declare class SortOptionDto {
    sortBy: SortBy;
    sortOrder: SortOrder;
}
export declare class FindAllEnrollmentQueryDto {
    includeSubmissions?: boolean;
    includeAllProgress?: boolean;
    includeCourse?: boolean;
    includeSections?: boolean;
    includeModuleProgresses?: boolean;
    courseId?: string;
    courseCategoryId?: string;
    searchQuery?: string;
    searchBy?: SearchBy;
    sortBy?: SortBy;
    sortOrder?: SortOrder;
}
