import { Program, UserRole } from '@prisma/client';
export declare class UpdateUserDto {
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    avatarSrc?: string;
}
export declare class UpdateUserRoleDto {
    role: UserRole;
    program?: Program;
    batchYear?: number;
    userTitle?: string;
}
