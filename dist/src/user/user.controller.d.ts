import { UserService } from './user.service';
import { User } from '@prisma/client';
import { UpdateUserDto, UpdateUserRoleDto } from './dto/req/update-user.dto';
import { FindAllUsersQueryDto } from 'src/user/dto/req/find-all-users-query.dto';
import { CheckEmailAvailabilityDto, CheckUsernameAvailabilityDto } from 'src/user/dto/req/check-user-availability.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(query: FindAllUsersQueryDto): Promise<{
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
    }[]>;
    getProfile(user: User): Promise<{
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
    checkEmailAvailability(query: CheckEmailAvailabilityDto): Promise<{
        isAvailable: boolean;
    }>;
    checkUsernameAvailability(query: CheckUsernameAvailabilityDto): Promise<{
        isAvailable: boolean;
    }>;
    updateProfile(user: User, updateUserDto: UpdateUserDto): Promise<{
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
    updateUserRole(id: string, updateUserRoleDto: UpdateUserRoleDto): Promise<{
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
    removeCurrentUser(user: User): Promise<{
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
