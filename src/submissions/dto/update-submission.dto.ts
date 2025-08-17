import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { SubmissionFieldValueDto } from 'src/submissions/dto/create-submission.dto';

export class UpdateSubmissionDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmissionFieldValueDto)
  submissionFieldValueData?: SubmissionFieldValueDto[];
}

export class LockSubmissionDto {
  @IsNotEmpty()
  @IsBoolean()
  isLocked: boolean;
}

export class GradeSubmissionDto {
  @IsNotEmpty()
  @IsBoolean()
  isGraded: boolean;

  @IsOptional()
  @IsBoolean()
  isPassed?: boolean;

  @IsOptional()
  @IsDecimal()
  scorePercentage?: Prisma.Decimal;

  @IsOptional()
  @IsDecimal()
  scoreAchieved?: Prisma.Decimal;

  @IsOptional()
  @IsInt()
  scoreTotal?: number;

  @IsOptional()
  @IsString()
  feedback?: string;
}
