import { CreateLinkDto, CreateSubdescriptionDto } from './create-module.dto';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ModuleType } from '@prisma/client';
import { Type } from 'class-transformer';

export class UpdateModuleDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsEnum(ModuleType)
  @IsOptional()
  moduleType?: ModuleType;

  @IsString()
  @IsOptional()
  embedVideoLink?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateLinkDto)
  links?: CreateLinkDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSubdescriptionDto)
  subdescriptions?: CreateSubdescriptionDto[];
}
