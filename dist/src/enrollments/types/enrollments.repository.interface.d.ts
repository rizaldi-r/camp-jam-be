import { CourseStatus, Enrollment, EnrollmentData, Prisma } from '@prisma/client';
export declare enum SortBy {
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
    TITLE = "title"
}
export declare enum SortOrder {
    ASC = "asc",
    DESC = "desc"
}
export declare enum SearchBy {
    TITLE = "title",
    INSTRUCTOR_NAME = "instructorName"
}
export interface SortOption {
    sortBy: SortBy;
    sortOrder: SortOrder;
}
export interface SearchData {
    searchQuery: string;
    searchBy: SearchBy;
}
export interface SortOption {
    sortBy: SortBy;
    sortOrder: SortOrder;
}
export interface CreateEnrollmentData {
    studentId: string;
    instructorId: string;
    courseId: string;
}
export interface UpdateEnrollmentData {
    status?: CourseStatus;
}
export interface UpdateEnrollmentDataData {
    progressPercentage: Prisma.Decimal | null;
    moduleCompleted: Prisma.Decimal | null;
    moduleTotal: number | null;
}
export interface FindAllCoursesQuery {
    includeSubmissions?: boolean;
    includeAllProgress?: boolean;
    includeCourse?: boolean;
    includeSections?: boolean;
    includeModuleProgresses?: boolean;
    courseId?: string;
    courseCategoryId?: string;
    search?: SearchData;
    sort?: SortOption;
}
export interface EnrollmentWithProgressIds extends Enrollment {
    moduleProgress?: EnrollmentData | null;
    lectureProgress?: EnrollmentData | null;
    assignmentProgress?: EnrollmentData | null;
}
export interface EnrollmentRepositoryItf {
    create(data: CreateEnrollmentData): Promise<Enrollment>;
    findByStudentAndCourse(studentId: string, courseId: string): Promise<Enrollment | null>;
    findAll(): Promise<Enrollment[]>;
    update(id: string, data: UpdateEnrollmentData): Promise<Enrollment>;
    delete(id: string): Promise<Enrollment>;
    getStudentOwnerId(id: string): Promise<string | null>;
    getInstructorOwnerId(id: string): Promise<string | null>;
}
