import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateSubmissionFieldDto {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsBoolean()
  isTextfield: boolean;
}

export class CreateSubmissionTemplateDto {
  @IsOptional()
  @IsString()
  submissionTitle: string;

  @IsUUID()
  @IsNotEmpty()
  moduleId: string;

  @IsOptional()
  @IsNumber()
  scoreTotal?: number;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateSubmissionFieldDto)
  submissionFields: CreateSubmissionFieldDto[];
}
