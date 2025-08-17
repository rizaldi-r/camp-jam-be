import { PartialType } from '@nestjs/mapped-types';
import { CreateEnrollmentDto } from './create-enrollment.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { CourseStatus } from '@prisma/client';

export class UpdateEnrollmentDto extends PartialType(CreateEnrollmentDto) {
  @IsOptional()
  @IsEnum(CourseStatus)
  status?: CourseStatus;
}
