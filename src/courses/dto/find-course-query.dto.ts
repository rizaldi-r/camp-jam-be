import { Program } from '@prisma/client';
import {
  IsBooleanString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export enum SortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  TITLE = 'title',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

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
  instructorName?: string;

  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
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
