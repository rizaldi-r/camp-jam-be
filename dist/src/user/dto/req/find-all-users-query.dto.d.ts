import { UserRole } from '@prisma/client';
export declare class FindAllUsersQueryDto {
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: UserRole;
}
