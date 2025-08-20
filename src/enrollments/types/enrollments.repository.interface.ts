import {
  CourseStatus,
  Enrollment,
  EnrollmentData,
  Prisma,
} from '@prisma/client';

export interface CreateEnrollmentData {
  studentId: string;
  instructorId: string;
  courseId: string;
}

export interface UpdateEnrollmentData {
  status?: CourseStatus;
}

export interface UpdateEnrollmentDataData {
  progressPercentage: Prisma.Decimal | null;
  moduleCompleted: Prisma.Decimal | null;
  moduleTotal: number | null;
}

export interface FindAllCoursesQuery {
  includeSubmissions?: boolean;
  includeAllProgress?: boolean;
  includeCourse?: boolean;
  courseId?: string;
  courseCategoryId?: string;
}

export interface EnrollmentWithProgressIds extends Enrollment {
  moduleProgress?: EnrollmentData | null;
  lectureProgress?: EnrollmentData | null;
  assignmentProgress?: EnrollmentData | null;
}

export interface EnrollmentRepositoryItf {
  create(data: CreateEnrollmentData): Promise<Enrollment>;
  findById(id: string): Promise<EnrollmentWithProgressIds | null>;
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
