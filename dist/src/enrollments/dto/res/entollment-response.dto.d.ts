import { CourseStatus } from '@prisma/client';
import { CourseResponseDto } from 'src/courses/dto/res/courses-response.dto';
import { InstructorResponseDto } from 'src/instructors/dto/res/instructors-response-body.dto';
import { ModuleProgressDto } from 'src/module-progress/dto/res/module-progress-response.dto';
import { StudentResponseDto } from 'src/students/dto/res/student-response.dto';
import { SubmissionResponseDto } from 'src/submissions/dto/res/submission-response.dto';
export declare class ProgressResponseDto {
    id: string;
    progressPercentage: number | null;
    moduleCompleted: number;
    moduleTotal: number;
    createdAt: Date;
    updatedAt: Date;
    moduleProgressId: string | null;
    lectureProgressId: string | null;
    assignmentProgressId: string | null;
    assignmentScoreId: string | null;
}
export declare class EnrollmentResponseDto {
    id: string;
    studentId: string;
    instructorId: string;
    courseId: string;
    status: CourseStatus;
    createdAt: Date;
    updatedAt: Date;
    instructor: InstructorResponseDto;
    student: StudentResponseDto;
    moduleProgress: ProgressResponseDto;
    lectureProgress: ProgressResponseDto;
    assignmentProgress: ProgressResponseDto;
    assignmentScore: ProgressResponseDto;
    moduleProgresses: ModuleProgressDto;
    course: CourseResponseDto;
    submissions: SubmissionResponseDto;
}
