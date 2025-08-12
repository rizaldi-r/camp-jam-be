import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Program } from '@prisma/client';

export class UpdateInstructorDetailsDto {
  @IsOptional()
  @IsEnum(Program)
  program?: Program;

  @IsOptional()
  @IsString()
  @MinLength(3)
  userTitle?: string;
}
