import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
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
  // @IsNotEmpty()
  // @IsBoolean()
  // isGraded: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isPassed: boolean;

  // @IsOptional()
  // @IsDecimal()
  // scorePercentage?: Prisma.Decimal;

  @IsNotEmpty()
  @IsDecimal()
  scoreAchieved: number;

  // @IsOptional()
  // @IsInt()
  // scoreTotal?: number;

  @IsOptional()
  @IsString()
  feedback?: string;
}
