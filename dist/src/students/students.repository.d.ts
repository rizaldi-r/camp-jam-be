import { MembershipStatus, Program, Student } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class StudentsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findStudentByUserId(userId: string): Promise<Student | null>;
    createStudent(userId: string, program: Program, batchYear: number): Promise<Student>;
    deleteStudent(userId: string): Promise<Student | null>;
    updateBatchYearByUserId(userId: string, batchYear: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        program: import(".prisma/client").$Enums.Program;
        batchYear: number;
        membershipStatus: import(".prisma/client").$Enums.MembershipStatus;
    }>;
    updateMembershipStatusByUserId(userId: string, membershipStatus: MembershipStatus): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        program: import(".prisma/client").$Enums.Program;
        batchYear: number;
        membershipStatus: import(".prisma/client").$Enums.MembershipStatus;
    }>;
}
