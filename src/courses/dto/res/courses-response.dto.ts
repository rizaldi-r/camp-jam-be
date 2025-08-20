import { Program } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CategoryResponseDto } from 'src/categories/dto/res/categories-response.dto';
import { InstructorResponseDto } from 'src/instructors/dto/res/instructors-response-body.dto';
import { SectionResponseDto } from 'src/sections/dto/res/sections-response.dto';

export class CourseResponseDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsOptional()
  @IsString()
  imageSrc: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  imageAlt: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  description: string | null;

  @Expose()
  @IsOptional()
  @IsDateString()
  startDate: string | null;

  @Expose()
  @IsOptional()
  @IsDateString()
  endDate: string | null;

  @Expose()
  @IsBoolean()
  isMemberOnly: boolean;

  @Expose()
  @IsBoolean()
  isLocked: boolean;

  @Expose()
  @IsUUID()
  instructorId: string;

  @Expose()
  @IsArray()
  @IsEnum(Program, { each: true })
  allowedPrograms: Program[];

  @Expose()
  @IsArray()
  @IsInt({ each: true })
  allowedBatchYears: number[];

  // Nested DTOs for related data, transformed using @Type()
  @Expose()
  @Type(() => InstructorResponseDto)
  instructor?: InstructorResponseDto;

  @Expose()
  @Type(() => SectionResponseDto)
  sections?: SectionResponseDto[];

  @Expose()
  // @Type(() => CategoryResponseDto)
  categories?: { category: CategoryResponseDto }[];
}
