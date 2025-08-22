import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserRole } from '@prisma/client';

interface valueItf {
  value: string;
}

export class FindAllUsersQueryDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @Transform(({ value }: valueItf) => value?.trim())
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @Transform(({ value }: valueItf) => value?.trim())
  firstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @Transform(({ value }: valueItf) => value?.trim())
  lastName?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @Transform(({ value }: valueItf) => value?.trim())
  email?: string;

  @IsOptional()
  @IsEnum(UserRole)
  @MinLength(1)
  role?: UserRole;
}
