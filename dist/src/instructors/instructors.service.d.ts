import { Instructor } from '@prisma/client';
import { UpdateInstructorDetailsDto } from 'src/instructors/dto/update-instructor.dto';
import { InstructorRepository } from 'src/instructors/instructors.repository';
export declare class InstructorsService {
    private readonly instructorRepository;
    constructor(instructorRepository: InstructorRepository);
    findInstructorById(id: string): Promise<Instructor>;
    findInstructorByUserId(userId: string): Promise<Instructor>;
    updateInstructorDetails(userId: string, updateDto: UpdateInstructorDetailsDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        program: import(".prisma/client").$Enums.Program;
        userTitle: string | null;
    }>;
}
