import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Enrollment } from '@prisma/client';
import {
  CreateEnrollmentData,
  EnrollmentRepositoryItf,
  UpdateEnrollmentData,
} from 'src/enrollments/types/enrollments.repository.interface';

@Injectable()
export class EnrollmentsRepository implements EnrollmentRepositoryItf {
  constructor(private readonly prisma: PrismaService) {}

  async getStudentOwnerId(id: string): Promise<string | null> {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
      select: {
        studentId: true,
      },
    });
    return enrollment?.studentId ?? null;
  }

  async getInstructorOwnerId(id: string): Promise<string | null> {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
      select: {
        instructorId: true,
      },
    });
    return enrollment?.instructorId ?? null;
  }

  async create(data: CreateEnrollmentData): Promise<Enrollment> {
    return this.prisma.enrollment.create({
      data,
    });
  }

  async createEnrollmentDataRecords(enrollmentId: string) {
    await this.prisma.enrollmentData.create({
      data: {
        moduleProgressId: enrollmentId,
      },
    });
    await this.prisma.enrollmentData.create({
      data: {
        lectureProgressId: enrollmentId,
      },
    });
    await this.prisma.enrollmentData.create({
      data: {
        assignmentProgressId: enrollmentId,
      },
    });
    await this.prisma.enrollmentData.create({
      data: {
        assignmentScoreId: enrollmentId,
      },
    });
  }

  async findById(id: string): Promise<Enrollment | null> {
    return this.prisma.enrollment.findUnique({
      where: { id },
      include: {
        moduleProgress: true,
        lectureProgress: true,
        assignmentProgress: true,
        assignmentScore: true,
        course: true,
        submissions: {
          include: {
            submissionTemplate: true,
            submissionFieldValue: {
              include: { submissionField: true },
            },
          },
        },
      },
    });
  }

  async findByStudentId(studentId: string): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany({
      where: { studentId },
      include: {
        moduleProgress: true,
        lectureProgress: true,
        assignmentProgress: true,
        assignmentScore: true,
        course: true,
        submissions: {
          include: {
            submissionTemplate: true,
            submissionFieldValue: {
              include: { submissionField: true },
            },
          },
        },
      },
    });
  }

  async findByStudentAndCourse(
    studentId: string,
    courseId: string,
  ): Promise<Enrollment | null> {
    return this.prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId: studentId,
          courseId: courseId,
        },
      },
    });
  }

  async findAll(): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany({
      include: {
        moduleProgress: true,
        lectureProgress: true,
        assignmentProgress: true,
        assignmentScore: true,
      },
    });
  }

  async findByCourseId(courseId: string): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany({
      where: {
        courseId: courseId,
      },
      include: {
        moduleProgress: true,
        lectureProgress: true,
        assignmentProgress: true,
        assignmentScore: true,
        // submissions: {
        //   include: {
        //     submissionTemplate: true,
        //     submissionFieldValue: {
        //       include: { submissionField: true },
        //     },
        //   },
        // },
      },
    });
  }

  async update(id: string, data: UpdateEnrollmentData): Promise<Enrollment> {
    return this.prisma.enrollment.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Enrollment> {
    return this.prisma.enrollment.delete({ where: { id } });
  }
}
