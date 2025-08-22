import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, UserRole } from '@prisma/client';
import {
  createParam,
  updateParam,
  UserRepositoryItf,
} from './types/user.repository.interface';

@Injectable()
export class UserRepository implements UserRepositoryItf {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters?: {
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: UserRole;
  }): Promise<User[]> {
    const { username, firstName, lastName, email, role } = filters || {};
    return this.prisma.user.findMany({
      where: {
        AND: [
          username
            ? { username: { contains: username, mode: 'insensitive' } }
            : {},
          firstName
            ? { firstName: { contains: firstName, mode: 'insensitive' } }
            : {},
          lastName
            ? { lastName: { contains: lastName, mode: 'insensitive' } }
            : {},
          email ? { email: { contains: email, mode: 'insensitive' } } : {},
          role ? { role } : {},
        ],
      },
      include: {
        student: true,
        instructor: true,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: { id },
      include: {
        student: true,
        instructor: true,
      },
    });
    return foundUser;
  }

  async findByUsername(username: string): Promise<User | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: { username },
      include: {
        student: true,
        instructor: true,
      },
    });
    return foundUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: { email },
      include: {
        student: true,
        instructor: true,
      },
    });
    return foundUser;
  }

  async create(createData: createParam): Promise<User> {
    return await this.prisma.user.create({
      data: createData,
    });
  }

  async update(id: string, userInput: updateParam): Promise<User | null> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...userInput,
      },
    });
    return updatedUser;
  }

  async updateUserRole(id: string, role: UserRole) {
    return this.prisma.user.update({
      where: { id },
      data: {
        role,
      },
      include: {
        student: true,
        instructor: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
