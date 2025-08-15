import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateSectionDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  title?: string;

  // @IsOptional()
  // @IsUUID()
  // courseId?: string;

  // @IsOptional()
  // @IsString()
  // description?: string;

  // @IsOptional()
  // @IsNumber()
  // order?: number;
}
