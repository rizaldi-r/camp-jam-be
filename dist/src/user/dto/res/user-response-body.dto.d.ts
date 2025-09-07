import { MembershipStatus, UserRole } from '@prisma/client';
export declare class StudentDTO {
    id: string;
    userId: string;
    program: string;
    batchYear: number;
    membershipStatus: MembershipStatus;
    createdAt: Date;
    updatedAt: Date;
}
export declare class InstructorDTO {
    id: string;
    userId: string;
    userTitle?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class UserResponseDto {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarSrc?: string | null;
    role: UserRole;
    passwordHash: string;
    refreshToken?: string | null;
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date;
    student?: StudentDTO;
    instructor?: InstructorDTO;
    isAvailable?: boolean;
}
