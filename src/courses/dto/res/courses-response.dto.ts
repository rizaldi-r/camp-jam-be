import { Exclude, Expose, Type } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';
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
  @IsString()
  imageSrc: string | null;

  @Expose()
  @IsString()
  imageAlt: string | null;

  @Expose()
  @IsString()
  description: string | null;

  @Expose()
  instructorId: string;

  @Expose()
  allowedPrograms: string[];

  @Expose()
  allowedBatchYears: number[];

  @Expose()
  isMemberOnly: boolean;

  @Expose()
  isLocked: boolean;

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
