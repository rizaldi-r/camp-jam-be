import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { SortBy, SortOrder } from 'src/courses/dto/find-course-query.dto';
import { SearchBy } from 'src/enrollments/types/enrollments.repository.interface';

// Search DTO
export class SearchDataDto {
  @IsNotEmpty()
  searchQuery: string;

  @IsEnum(SearchBy)
  searchBy: SearchBy;
}

// Sort DTO
export class SortOptionDto {
  @IsEnum(SortBy)
  sortBy: SortBy;

  @IsEnum(SortOrder)
  sortOrder: SortOrder;
}

export class FindAllEnrollmentQueryDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  includeSubmissions?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  includeAllProgress?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  includeCourse?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  includeSections?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  includeModuleProgresses?: boolean;

  @IsOptional()
  @IsString()
  courseId?: string;

  @IsOptional()
  @IsString()
  courseCategoryId?: string;

  @IsOptional()
  @IsString()
  searchQuery?: string;

  @IsOptional()
  @IsEnum(SearchBy)
  searchBy?: SearchBy;

  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
}
