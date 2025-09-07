import { UserRepository } from './user.repository';
import { UpdateUserDto, UpdateUserRoleDto } from './dto/req/update-user.dto';
import { User, UserRole } from '@prisma/client';
import { UserServiceItf } from 'src/user/types/user.service.inteface';
import { FindAllUsersQueryDto } from 'src/user/dto/req/find-all-users-query.dto';
import { StudentsRepository } from 'src/students/students.repository';
import { InstructorRepository } from 'src/instructors/instructors.repository';
export declare class UserService implements UserServiceItf {
    private readonly userRepository;
    private readonly studentsRepository;
    private readonly instructorRepository;
    constructor(userRepository: UserRepository, studentsRepository: StudentsRepository, instructorRepository: InstructorRepository);
    findAll(filters?: FindAllUsersQueryDto): Promise<{
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
    findById(id: string): Promise<User>;
    findByUsername(username: string): Promise<{
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
    findByEmail(email: string): Promise<{
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
    isUsernameAvailable(username: string): Promise<boolean>;
    isEmailAvailable(email: string): Promise<boolean>;
    update(id: string, updateUserDto: UpdateUserDto & {
        userRole?: UserRole;
    }): Promise<User>;
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
