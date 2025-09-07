import { PrismaService } from 'src/prisma/prisma.service';
import { Enrollment, EnrollmentData, Prisma } from '@prisma/client';
import { CreateEnrollmentData, EnrollmentRepositoryItf, EnrollmentWithProgressIds, FindAllCoursesQuery, UpdateEnrollmentData, UpdateEnrollmentDataData } from 'src/enrollments/types/enrollments.repository.interface';
export declare class EnrollmentsRepository implements EnrollmentRepositoryItf {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private buildSearchCondition;
    private buildOrderByClause;
    getStudentOwnerId(id: string): Promise<string | null>;
    getInstructorOwnerId(id: string): Promise<string | null>;
    create(data: CreateEnrollmentData): Promise<Enrollment>;
    createEnrollmentDataRecords(enrollmentId: string, moduleTotal: number, lectureTotal: number, assignmentTotal: number, totalAssignmentScore: number): Promise<void>;
    findById(id: string, query?: FindAllCoursesQuery): Promise<EnrollmentWithProgressIds | null>;
    findByStudentId(studentId: string, query: FindAllCoursesQuery): Promise<Enrollment[]>;
    findByStudentAndCourse(studentId: string, courseId: string): Promise<Enrollment | null>;
    findAll(): Promise<Enrollment[]>;
    findByCourseId(courseId: string): Promise<Enrollment[]>;
    getEnrollmentDataAssignmentByEnrollmentId(enrollmentId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        progressPercentage: Prisma.Decimal | null;
        moduleCompleted: Prisma.Decimal | null;
        moduleTotal: number | null;
        moduleProgressId: string | null;
        lectureProgressId: string | null;
        assignmentProgressId: string | null;
        assignmentScoreId: string | null;
    } | null>;
    update(id: string, data: UpdateEnrollmentData): Promise<Enrollment>;
    updateEnrollmentDataAssignment(enrollmentId: string, data: UpdateEnrollmentDataData): Promise<EnrollmentData>;
    delete(id: string): Promise<Enrollment>;
}
