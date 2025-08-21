import { MembershipStatus } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import {
  IsUUID,
  IsString,
  IsNumber,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { UserResponseDto } from 'src/user/dto/res/user-response-body.dto';

export class StudentResponseDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  program: string;

  @Expose()
  @IsNumber()
  batchYear: number;

  @Expose()
  @IsEnum(MembershipStatus)
  membershipStatus: MembershipStatus;

  @Expose()
  @IsDateString()
  createdAt: Date;

  @Expose()
  @IsDateString()
  updatedAt: Date;

  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;
}
