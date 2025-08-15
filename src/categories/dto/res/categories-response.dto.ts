import { Program } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsEnum, IsString, IsUUID } from 'class-validator';

export class CategoryResponseDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEnum(Program)
  program: Program;
}
