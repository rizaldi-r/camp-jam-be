import {
  IsString,
  IsUUID,
  IsOptional,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { DescriptionType } from '@prisma/client';

/**
 * Data Transfer Object for creating a new Subdescription.
 * It defines the required fields and their validation rules.
 */
export class CreateSubdescriptionDto {
  @IsNotEmpty()
  @IsString()
  header: string;

  @IsNotEmpty()
  @IsEnum(DescriptionType)
  type: DescriptionType;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsUUID()
  moduleId: string;
}
