import { User } from '@prisma/client';
import { UpdateUserDto, UpdateUserRoleDto } from '../dto/req/update-user.dto';
import { FindAllUsersQueryDto } from 'src/user/dto/req/find-all-users-query.dto';
export interface UserServiceItf {
    findAll(filters?: FindAllUsersQueryDto): Promise<User[]>;
    findById(id: string): Promise<User>;
    isEmailAvailable(email: string): Promise<boolean>;
    findByUsername(username: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    updateUserRole(id: string, UpdateUserRoleDto: UpdateUserRoleDto): Promise<User>;
    remove(id: string): Promise<User>;
}
