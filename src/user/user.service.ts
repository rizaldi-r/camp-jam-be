import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UpdateUserDto, UpdateUserRoleDto } from './dto/req/update-user.dto';
import { hashPassword } from '../_common/utils/password-hashing';
import { Instructor, Student, User, UserRole } from '@prisma/client';
import { ResourceNotFoundException } from 'src/_common/exceptions/custom-not-found.exception';
import { UserServiceItf } from 'src/user/types/user.service.inteface';
import { FindAllUsersQueryDto } from 'src/user/dto/req/find-all-users-query.dto';
import { StudentsRepository } from 'src/students/students.repository';
import { InstructorRepository } from 'src/instructors/instructors.repository';

@Injectable()
export class UserService implements UserServiceItf {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly studentsRepository: StudentsRepository,
    private readonly instructorRepository: InstructorRepository,
  ) {}

  async findAll(filters?: FindAllUsersQueryDto) {
    return this.userRepository.findAll(filters);
  }

  async findById(id: string): Promise<User> {
    if (id === undefined || id === null) {
      throw new BadRequestException('User ID cannot be undefined or null.');
    }

    const user = await this.userRepository.findById(id);
    if (!user) throw new ResourceNotFoundException('User', 'id', id);
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new ResourceNotFoundException('User', 'username', username);
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new ResourceNotFoundException('User', 'email', email);
    }
    return user;
  }

  async isUsernameAvailable(username: string): Promise<boolean> {
    if (!username) throw new BadRequestException('Username cannot be empty.');
    const user = await this.userRepository.findByUsername(username);
    return user === null;
  }

  async isEmailAvailable(email: string): Promise<boolean> {
    if (!email) throw new BadRequestException('Username cannot be empty.');
    const user = await this.userRepository.findByEmail(email);
    return user === null;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto & { userRole?: UserRole },
  ): Promise<User> {
    // check if user exist
    await this.findById(id);

    // filter out userRole for extra safety
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userRole, password, email, username, ...otherData } = updateUserDto;

    // check if email and username already exist
    if (email) {
      const existingEmail = await this.userRepository.findByEmail(email);
      if (existingEmail)
        throw new ConflictException('Email already registered');
    }
    if (username) {
      const existingUsername =
        await this.userRepository.findByUsername(username);
      if (existingUsername)
        throw new ConflictException('Username already exist');
    }

    // hash password
    let passwordHash: string | undefined;
    if (password) {
      passwordHash = await hashPassword(password);
    }

    // add paswordHash if exist
    const modifiedUserData = {
      ...otherData,
      ...(passwordHash && { passwordHash }),
      username,
      email,
    };

    // update db
    const updatedUser = await this.userRepository.update(id, modifiedUserData);
    if (!updatedUser) {
      throw new InternalServerErrorException(
        `Failed to update user with ID ${id} unexpectedly.`,
      );
    }

    return updatedUser;
  }

  async updateUserRole(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    const user: User & { student?: Student; instructor?: Instructor } =
      await this.findById(id);

    // Remove existing relations
    if (user.student) {
      await this.studentsRepository.deleteStudent(id);
    }
    if (user.instructor) {
      await this.instructorRepository.deleteInstructor(id);
    }

    // Create new relation based on the new role
    switch (updateUserRoleDto.role) {
      case UserRole.STUDENT:
        if (!updateUserRoleDto.program || !updateUserRoleDto.batchYear) {
          throw new BadRequestException(
            'Program and batchYear are required for a student role.',
          );
        }
        await this.studentsRepository.createStudent(
          id,
          updateUserRoleDto.program,
          updateUserRoleDto.batchYear,
        );
        break;
      case UserRole.INSTRUCTOR:
        if (!updateUserRoleDto.program) {
          throw new BadRequestException(
            'Program are required for a instructor role.',
          );
        }
        await this.instructorRepository.createInstructor(
          id,
          updateUserRoleDto.program,
          updateUserRoleDto.userTitle,
        );
        break;
      case UserRole.ADMIN:
      default:
    }

    // Update the user's role
    const updatedUser = await this.userRepository.updateUserRole(
      id,
      updateUserRoleDto.role,
    );

    // Return the updated user with the new relation
    return updatedUser;
  }

  async remove(id: string) {
    await this.findById(id);
    return this.userRepository.remove(id);
  }
}
