import { User, UserRole } from '@prisma/client';
export interface UserRepositoryItf {
    findAll(filters?: filters): Promise<User[] | null>;
    findById(id: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(createData: createParam): Promise<User>;
    update(id: string, userInput: updateParam): Promise<User | null>;
    updateUserRole(id: string, role: UserRole): Promise<User>;
    remove(id: string): Promise<User>;
}
export interface filters {
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
}
export interface createParam {
    username: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role: UserRole;
}
export interface updateParam {
    username?: string;
    email?: string;
    passwordHash?: string;
    firstName?: string;
    lastName?: string;
    avatarSrc?: string;
    lastLogin?: Date;
    refreshToken?: string | null;
}
