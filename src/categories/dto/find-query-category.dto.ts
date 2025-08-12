import { Program } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class FindAllCategoriesDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(Program)
  program?: Program;
}
