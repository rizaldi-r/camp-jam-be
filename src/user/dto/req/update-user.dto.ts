import { Program, UserRole } from '@prisma/client';
import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  MaxLength,
  IsUrl,
  IsEnum,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @MinLength(5)
  @MaxLength(100)
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(255)
  password?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @MaxLength(255)
  avatarSrc?: string;
}

export class UpdateUserRoleDto {
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsEnum(Program)
  program?: Program;

  @IsOptional()
  @IsNumber()
  batchYear?: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  userTitle?: string;
}
