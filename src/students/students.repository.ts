import { Injectable } from '@nestjs/common';
import { MembershipStatus, Program, Student } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findStudentByUserId(userId: string): Promise<Student | null> {
    return this.prisma.student.findUnique({
      where: { userId },
    });
  }

  async createStudent(
    userId: string,
    program: Program,
    batchYear: number,
  ): Promise<Student> {
    return this.prisma.student.create({
      data: {
        userId,
        program,
        batchYear,
      },
    });
  }

  async deleteStudent(userId: string): Promise<Student | null> {
    return this.prisma.student.delete({
      where: { userId },
    });
  }

  async updateBatchYearByUserId(userId: string, batchYear: number) {
    return this.prisma.student.update({
      where: { userId },
      data: { batchYear },
    });
  }

  async updateMembershipStatusByUserId(
    userId: string,
    membershipStatus: MembershipStatus,
  ) {
    return this.prisma.student.update({
      where: { userId },
      data: { membershipStatus },
    });
  }
}
