import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSubmissionFieldDto {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsOptional()
  @IsBoolean()
  isTextfield?: boolean;
}

export class UpdateSubmissionTemplateDto {
  @IsOptional()
  @IsString()
  submissionTitle: string;

  // @IsOptional()
  // @IsUUID()
  // moduleId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSubmissionFieldDto)
  submissionFields?: UpdateSubmissionFieldDto[];
}
