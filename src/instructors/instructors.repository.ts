import { Injectable } from '@nestjs/common';
import { Instructor, Program } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InstructorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findInstructorById(id: string): Promise<Instructor | null> {
    return this.prisma.instructor.findUnique({
      where: { id },
    });
  }

  async findInstructorByUserId(userId: string): Promise<Instructor | null> {
    return this.prisma.instructor.findUnique({
      where: { userId },
    });
  }

  async updateInstructorDetailsByUserId(
    userId: string,
    updateData: { program?: Program; userTitle?: string },
  ): Promise<Instructor> {
    return this.prisma.instructor.update({
      where: { userId },
      data: updateData,
    });
  }

  async createInstructor(
    userId: string,
    program: Program,
    userTitle?: string,
  ): Promise<Instructor> {
    return this.prisma.instructor.create({
      data: {
        userId,
        userTitle,
        program,
      },
    });
  }

  async deleteInstructor(userId: string): Promise<Instructor | null> {
    return this.prisma.instructor.delete({
      where: { userId },
    });
  }
}
