import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
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
  submitted?: string;
}

export class CreateSubmissionDto {
  @IsNotEmpty()
  @IsUUID()
  moduleId: string;

  @IsNotEmpty()
  @IsUUID()
  enrollmentId: string;

  @IsNotEmpty()
  @IsNumber()
  scoreTotal: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmissionFieldValueDto)
  submissionFieldValueData: SubmissionFieldValueDto[];
}
