import { Instructor, Program } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class InstructorRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findInstructorById(id: string): Promise<Instructor | null>;
    findInstructorByUserId(userId: string): Promise<Instructor | null>;
    updateInstructorDetailsByUserId(userId: string, updateData: {
        program?: Program;
        userTitle?: string;
    }): Promise<Instructor>;
    createInstructor(userId: string, program: Program, userTitle?: string): Promise<Instructor>;
    deleteInstructor(userId: string): Promise<Instructor | null>;
}
