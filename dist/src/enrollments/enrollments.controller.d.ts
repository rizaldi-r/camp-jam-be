import { Enrollment } from '@prisma/client';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
import { UserType } from 'src/_common/types/user.type';
import { UpdateEnrollmentDto } from 'src/enrollments/dto/update-enrollment.dto';
import { CreateEnrollmentDto } from 'src/enrollments/dto/create-enrollment.dto';
import { FindAllEnrollmentQueryDto } from 'src/enrollments/dto/find-enrollment.dto';
export declare class EnrollmentsController {
    private readonly enrollmentsService;
    constructor(enrollmentsService: EnrollmentsService);
    create(createEnrollmentDto: CreateEnrollmentDto, user: UserType): Promise<Enrollment>;
    findAll(): Promise<Enrollment[]>;
    findByCourseId(courseId: string): Promise<Enrollment[]>;
    getEnrollmentsByStudentId(user: UserType, query: FindAllEnrollmentQueryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        instructorId: string;
        courseId: string;
        status: import(".prisma/client").$Enums.CourseStatus;
        studentId: string;
    }[]>;
    findOne(id: string, query: FindAllEnrollmentQueryDto): Promise<Enrollment>;
    update(id: string, updateEnrollmentDto: UpdateEnrollmentDto): Promise<Enrollment>;
    remove(id: string): Promise<Enrollment>;
}
