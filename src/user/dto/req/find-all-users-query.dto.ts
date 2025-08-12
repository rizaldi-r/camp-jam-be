import { IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

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
}
