import { UpdateStudentBatchYearDto, UpdateStudentMembershipDto } from './dto/update-student.dto';
import { StudentsService } from 'src/students/students.service';
export declare class StudentsController {
    private readonly studentService;
    constructor(studentService: StudentsService);
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
