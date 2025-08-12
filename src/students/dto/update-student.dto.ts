import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { MembershipStatus } from '@prisma/client';

export class UpdateStudentBatchYearDto {
  @IsNotEmpty()
  @IsInt()
  batchYear: number;
}

export class UpdateStudentMembershipDto {
  @IsNotEmpty()
  @IsEnum(MembershipStatus)
  membershipStatus: MembershipStatus;
}
