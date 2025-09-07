import { UpdateStudentBatchYearDto, UpdateStudentMembershipDto } from './dto/update-student.dto';
import { StudentsRepository } from 'src/students/students.repository';
export declare class StudentsService {
    private readonly studentRepository;
    constructor(studentRepository: StudentsRepository);
    findStudentByUserId(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        program: import(".prisma/client").$Enums.Program;
        batchYear: number;
        membershipStatus: import(".prisma/client").$Enums.MembershipStatus;
    }>;
    updateBatchYear(userId: string, updateDto: UpdateStudentBatchYearDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        program: import(".prisma/client").$Enums.Program;
        batchYear: number;
        membershipStatus: import(".prisma/client").$Enums.MembershipStatus;
    }>;
    updateMembershipStatus(userId: string, updateDto: UpdateStudentMembershipDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        program: import(".prisma/client").$Enums.Program;
        batchYear: number;
        membershipStatus: import(".prisma/client").$Enums.MembershipStatus;
    }>;
}
