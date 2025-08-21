import { Program } from '@prisma/client';
import {
  IsBooleanString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class FindAllCoursesQueryDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(Program)
  program?: Program;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsString()
  categoryName?: string;

  @IsOptional()
  @IsUUID()
  instructorId?: string;

  @IsOptional()
  @IsString()
  instructorUsername?: string;
}

export class FindOneCourseDto {
  @IsOptional()
  @IsBooleanString()
  showInstructor?: boolean;

  @IsOptional()
  @IsBooleanString()
  showSections?: boolean;

  @IsOptional()
  @IsBooleanString()
  showCategories?: boolean;

  @IsOptional()
  @IsUUID()
  categoryId?: string;
}
