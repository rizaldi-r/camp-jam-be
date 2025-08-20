import {
  IsUUID,
  IsString,
  IsBoolean,
  IsInt,
  IsArray,
  IsOptional,
  IsDateString,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type, Expose } from 'class-transformer';

// export class SubmissionFieldDto {
//   @Expose()
//   @IsUUID()
//   id: string;

//   @Expose()
//   @IsString()
//   label: string;

//   @Expose()
//   @IsBoolean()
//   isTextfield: boolean;

//   @Expose()
//   @IsUUID()
//   submissionTemplateId: string;

//   @Expose()
//   @IsDateString()
//   createdAt: string;

//   @Expose()
//   @IsDateString()
//   updatedAt: string;
// }

export class SubmissionFieldValueDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  submitted: string;

  @Expose()
  @IsUUID()
  submissionId: string;

  @Expose()
  @IsUUID()
  submissionFieldId: string;

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;

  // @Expose()
  // @ValidateNested()
  // @Type(() => SubmissionFieldDto)
  // submissionField: SubmissionFieldDto;
}

export class SubmissionResponseDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsUUID()
  studentId: string;

  @Expose()
  @IsUUID()
  enrollmentId: string;

  @Expose()
  @IsUUID()
  moduleId: string;

  @Expose()
  @IsUUID()
  submissionTemplateId: string;

  @Expose()
  @IsBoolean()
  isLocked: boolean;

  @Expose()
  @IsBoolean()
  isGraded: boolean;

  @Expose()
  @IsBoolean()
  isPassed: boolean;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  scorePercentage: string;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  scoreAchieved: string;

  @Expose()
  @IsInt()
  scoreTotal: number;

  @Expose()
  @IsString()
  @IsOptional()
  feedback: string | null;

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmissionFieldValueDto)
  submissionFieldValue: SubmissionFieldValueDto[];
}
