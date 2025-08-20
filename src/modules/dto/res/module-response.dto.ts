import {
  IsUUID,
  IsString,
  IsBoolean,
  IsInt,
  IsArray,
  IsOptional,
  IsEnum,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type, Expose } from 'class-transformer';
import { DescriptionType, ModuleType } from '@prisma/client';

/**
 * DTO for a submission field within an assignment template.
 */
export class SubmissionFieldDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  label: string;

  @Expose()
  @IsBoolean()
  isTextfield: boolean;

  @Expose()
  @IsUUID()
  submissionTemplateId: string;

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}

/**
 * DTO for the assignment submission template.
 */
export class SubmissionTemplateDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsUUID()
  moduleId: string;

  @Expose()
  @IsString()
  submissionTitle: string;

  @Expose()
  @IsOptional()
  @IsDateString()
  endDate: string | null;

  @Expose()
  @IsInt()
  scoreTotal: number;

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmissionFieldDto)
  submissionFields: SubmissionFieldDto[];
}

/**
 * DTO for a link associated with a module.
 */
export class ModuleLinkDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  label: string;

  @Expose()
  @IsString()
  href: string;

  @Expose()
  @IsUUID()
  moduleId: string;

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}

/**
 * DTO for a sub-description within a module.
 */
export class ModuleSubdescriptionDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  header: string;

  @Expose()
  @IsEnum(DescriptionType)
  type: DescriptionType;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsUUID()
  moduleId: string;

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;
}

export class ModuleResponseDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsEnum(ModuleType)
  moduleType: ModuleType;

  @Expose()
  @IsOptional()
  @IsString()
  embedVideoLink: string | null;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsUUID()
  sectionId: string;

  @Expose()
  @IsDateString()
  createdAt: string;

  @Expose()
  @IsDateString()
  updatedAt: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ModuleLinkDto)
  links: ModuleLinkDto[];

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ModuleSubdescriptionDto)
  subdescriptions: ModuleSubdescriptionDto[];

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => SubmissionTemplateDto)
  submissionTemplate: SubmissionTemplateDto | null;
}
