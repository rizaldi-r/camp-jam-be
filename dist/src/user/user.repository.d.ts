import { PrismaService } from '../prisma/prisma.service';
import { User, UserRole } from '@prisma/client';
import { createParam, updateParam, UserRepositoryItf } from './types/user.repository.interface';
export declare class UserRepository implements UserRepositoryItf {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(filters?: {
        username?: string;
        firstName?: string;
        lastName?: string;
        email?: string;
        role?: UserRole;
    }): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(createData: createParam): Promise<User>;
    update(id: string, userInput: updateParam): Promise<User | null>;
    updateUserRole(id: string, role: UserRole): Promise<{
        student: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            program: import(".prisma/client").$Enums.Program;
            batchYear: number;
            membershipStatus: import(".prisma/client").$Enums.MembershipStatus;
        } | null;
        instructor: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            program: import(".prisma/client").$Enums.Program;
            userTitle: string | null;
        } | null;
    } & {
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        passwordHash: string;
        avatarSrc: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        refreshToken: string | null;
        lastLogin: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        passwordHash: string;
        avatarSrc: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        refreshToken: string | null;
        lastLogin: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
