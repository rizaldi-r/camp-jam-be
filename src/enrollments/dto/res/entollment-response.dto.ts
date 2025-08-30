import { CourseStatus } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CourseResponseDto } from 'src/courses/dto/res/courses-response.dto';
import { InstructorResponseDto } from 'src/instructors/dto/res/instructors-response-body.dto';
import { ModuleProgressDto } from 'src/module-progress/dto/res/module-progress-response.dto';
import { StudentResponseDto } from 'src/students/dto/res/student-response.dto';
import { SubmissionResponseDto } from 'src/submissions/dto/res/submission-response.dto';

export class ProgressResponseDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  progressPercentage: number | null;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  moduleCompleted: number;

  @Expose()
  @IsNumber()
  moduleTotal: number;

  @Expose()
  @Type(() => Date)
  @IsDate()
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  @IsDate()
  updatedAt: Date;

  @Expose()
  @IsString()
  @IsOptional()
  moduleProgressId: string | null;

  @Expose()
  @IsString()
  @IsOptional()
  lectureProgressId: string | null;

  @Expose()
  @IsString()
  @IsOptional()
  assignmentProgressId: string | null;

  @Expose()
  @IsString()
  @IsOptional()
  assignmentScoreId: string | null;
}

export class EnrollmentResponseDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsUUID()
  studentId: string;

  @Expose()
  @IsUUID()
  instructorId: string;

  @Expose()
  @IsUUID()
  courseId: string;

  @Expose()
  @IsEnum(CourseStatus)
  status: CourseStatus;

  @Expose()
  @Type(() => Date)
  @IsDate()
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  @IsDate()
  updatedAt: Date;

  @Expose()
  @Type(() => InstructorResponseDto)
  @ValidateNested()
  instructor: InstructorResponseDto;

  @Expose()
  @Type(() => StudentResponseDto)
  @ValidateNested()
  student: StudentResponseDto;

  @Expose()
  @Type(() => ProgressResponseDto)
  @ValidateNested()
  moduleProgress: ProgressResponseDto;

  @Expose()
  @Type(() => ProgressResponseDto)
  @ValidateNested()
  lectureProgress: ProgressResponseDto;

  @Expose()
  @Type(() => ProgressResponseDto)
  @ValidateNested()
  assignmentProgress: ProgressResponseDto;

  @Expose()
  @Type(() => ProgressResponseDto)
  @ValidateNested()
  assignmentScore: ProgressResponseDto;

  @Expose()
  @Type(() => ModuleProgressDto)
  @ValidateNested()
  moduleProgresses: ModuleProgressDto;

  @Expose()
  @Type(() => CourseResponseDto)
  @ValidateNested()
  course: CourseResponseDto;

  @Expose()
  @Type(() => SubmissionResponseDto)
  @ValidateNested()
  submissions: SubmissionResponseDto;
}
