import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateSubmissionFieldDto {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsOptional()
  @IsBoolean()
  isTextfield?: boolean;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  submissionTemplateId: string;
}
