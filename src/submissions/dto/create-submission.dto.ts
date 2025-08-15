import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class SubmissionFieldValueDto {
  @IsNotEmpty()
  @IsUUID()
  submissionFieldId: string;

  @IsNotEmpty()
  @IsString()
  submitted: string;
}

export class CreateSubmissionDto {
  @IsNotEmpty()
  @IsUUID()
  submissionTemplateId: string;

  @IsNotEmpty()
  @IsUUID()
  moduleId: string;

  @IsNotEmpty()
  @IsUUID()
  enrollmentId: string;

  @IsNotEmpty()
  @IsUUID()
  studentId: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmissionFieldValueDto)
  submittedContents: SubmissionFieldValueDto[];
}
