import { CourseStatus, Enrollment } from '@prisma/client';

export interface CreateEnrollmentData {
  studentId: string;
  instructorId: string;
  courseId: string;
}

export interface UpdateEnrollmentData {
  status?: CourseStatus;
}

export interface EnrollmentRepositoryItf {
  create(data: CreateEnrollmentData): Promise<Enrollment>;
  findById(id: string): Promise<Enrollment | null>;
  findByStudentAndCourse(
    studentId: string,
    courseId: string,
  ): Promise<Enrollment | null>;
  findAll(): Promise<Enrollment[]>;
  update(id: string, data: UpdateEnrollmentData): Promise<Enrollment>;
  delete(id: string): Promise<Enrollment>;
  getStudentOwnerId(id: string): Promise<string | null>;
  getInstructorOwnerId(id: string): Promise<string | null>;
}
