import { DescriptionType, ModuleType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateSubmissionFieldDto } from 'src/submission-templates/dto/create-submission-template.dto';

export class CreateLinkDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  href: string;
}

export class CreateSubdescriptionDto {
  @IsString()
  @IsNotEmpty()
  header: string;

  @IsEnum(DescriptionType)
  @IsOptional()
  type?: DescriptionType;

  @IsString()
  @IsOptional()
  description?: string;
}

class CreateSubmissionTemplateDto {
  @IsOptional()
  @IsString()
  submissionTitle: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateSubmissionFieldDto)
  submissionFields: CreateSubmissionFieldDto[];
}

export class CreateModuleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(ModuleType)
  @IsNotEmpty()
  moduleType: ModuleType;

  @IsString()
  @IsOptional()
  embedVideoLink?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  @IsNotEmpty()
  sectionId: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSubdescriptionDto)
  subdescriptions?: CreateSubdescriptionDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateLinkDto)
  links?: CreateLinkDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateSubmissionTemplateDto)
  submissionTemplate?: CreateSubmissionTemplateDto;
}
