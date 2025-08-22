import { Program } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @IsOptional()
  @IsString()
  imageSrc?: string;

  @IsOptional()
  @IsString()
  imageAlt?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @IsOptional()
  @IsBoolean()
  isMemberOnly?: boolean;

  @IsOptional()
  @IsBoolean()
  isLocked?: boolean;

  @IsOptional()
  @IsString()
  @IsUUID()
  instructorId: string;

  @IsNotEmpty()
  @IsArray()
  @IsEnum(Program, { each: true })
  allowedPrograms: Program[];

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  allowedBatchYears: number[];

  @IsNotEmpty()
  @IsArray()
  @IsUUID('all', { each: true })
  categoryIds: string[];
}
