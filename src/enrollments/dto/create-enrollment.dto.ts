import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateEnrollmentDto {
  // @IsNotEmpty()
  // @IsUUID()
  // studentId: string;

  // @IsNotEmpty()
  // @IsUUID()
  // instructorId: string;

  @IsNotEmpty()
  @IsUUID()
  courseId: string;
}
