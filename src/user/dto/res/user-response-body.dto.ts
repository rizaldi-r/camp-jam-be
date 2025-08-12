import { MembershipStatus, UserRole } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';

export class StudentDTO {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  program: string;

  @Expose()
  batchYear: number;

  @Expose()
  membershipStatus: MembershipStatus;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;
}

export class InstructorDTO {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  userTitle?: string | null;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;
}

export class UserResponseBodyDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  avatarSrc?: string | null;

  @Expose()
  role: UserRole;

  @Exclude({ toPlainOnly: true })
  passwordHash: string;

  @Exclude({ toPlainOnly: true })
  refreshToken?: string | null;

  @Expose()
  @Type(() => Date)
  lastLogin: Date;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;

  @Expose()
  @Type(() => StudentDTO)
  student?: StudentDTO;

  @Expose()
  @Type(() => InstructorDTO)
  instructor?: InstructorDTO;

  @Expose()
  isAvailable?: boolean;
}
