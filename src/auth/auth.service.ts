import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import {
  comparePassword,
  hashPassword,
} from '../_common/utils/password-hashing';
import { UserRepository } from '../user/user.repository';
import { PayloadItf } from 'src/_common/types/payload.type';
import { UserRole } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userRepository: UserRepository,
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  check() {
    return { message: 'Access granted' };
  }

  private async generateToken(payload: PayloadItf) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_EXPIRATION_ACCESS',
          '15m',
        ),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_EXPIRATION_REFRESH',
          '7d',
        ),
      }),
    ]);

    return { access_token, refresh_token };
  }

  async refresh(userId: string) {
    // find user from db
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    // Generate JWT token
    const tokens = await this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    await this.userRepository.update(user.id, {
      lastLogin: new Date(),
      refreshToken: tokens.refresh_token,
    });

    return {
      accessToken: tokens.access_token,
    };
  }

  async register(registerDto: RegisterDto) {
    const { password, program, ...otherData } = registerDto;

    // Check if user already exists
    const isEmailExist = !(await this.userService.isEmailAvailable(
      otherData.email,
    ));
    const isUsernameExist = !(await this.userService.isUsernameAvailable(
      otherData.username,
    ));
    if (isEmailExist || isUsernameExist)
      throw new ConflictException(
        'User with this email or username already exists',
      );

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user in db
    const user = await this.userRepository.create({
      ...otherData,
      passwordHash: hashedPassword,
      role: UserRole.STUDENT,
    });

    // Create a corresponding student profile
    // TODO: import from student resource
    await this.prisma.student.create({
      data: {
        userId: user.id,
        program: program,
        batchYear: new Date().getFullYear(),
      },
    });

    // generate and save token
    const tokens = await this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    await this.userRepository.update(user.id, {
      lastLogin: new Date(),
      refreshToken: tokens.refresh_token,
    });

    // Remove password from response
    return {
      message: 'User registered successfully',
      code: 201,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        tokens,
      },
    };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const { email, password } = loginDto;

    // Find the user
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new UnauthorizedException('Email not registered');

    // Verify password
    const hashedPassword = user.passwordHash;
    if (!hashedPassword)
      throw new UnauthorizedException('Account has no password set.');

    // Compare password
    const isPasswordValid = await comparePassword(password, hashedPassword);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid Credential');

    // Generate and save JWT token
    const tokens = await this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    await this.userRepository.update(user.id, {
      lastLogin: new Date(),
      refreshToken: tokens.refresh_token,
    });
    return tokens;
  }

  async logout(userId: string) {
    await this.userRepository.update(userId, {
      refreshToken: null,
    });
  }
}
