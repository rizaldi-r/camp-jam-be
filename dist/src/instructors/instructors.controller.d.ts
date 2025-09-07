import { InstructorsService } from './instructors.service';
import { UpdateInstructorDetailsDto } from 'src/instructors/dto/update-instructor.dto';
import { User } from '@prisma/client';
export declare class InstructorsController {
    private readonly instructorsService;
    constructor(instructorsService: InstructorsService);
    updateInstructorDetailsByUserId(userId: string, updateDto: UpdateInstructorDetailsDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        program: import(".prisma/client").$Enums.Program;
        userTitle: string | null;
    }>;
    updateInstructorDetails(user: User, updateDto: UpdateInstructorDetailsDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        program: import(".prisma/client").$Enums.Program;
        userTitle: string | null;
    }>;
}
