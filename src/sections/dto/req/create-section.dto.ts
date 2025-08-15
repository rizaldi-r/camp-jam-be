import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateSectionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @IsUUID()
  courseId: string;

  // @IsOptional()
  // @IsString()
  // description?: string;

  // @IsOptional()
  // @IsNumber()
  // order?: number;
}
