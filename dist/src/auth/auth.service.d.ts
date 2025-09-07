import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../user/user.repository';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    private jwtService;
    private configService;
    private userRepository;
    private userService;
    private prisma;
    constructor(jwtService: JwtService, configService: ConfigService, userRepository: UserRepository, userService: UserService, prisma: PrismaService);
    check(): {
        message: string;
    };
    private generateToken;
    refresh(userId: string): Promise<{
        accessToken: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        message: string;
        code: number;
        data: {
            id: string;
            username: string;
            email: string;
            tokens: {
                access_token: string;
                refresh_token: string;
            };
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(userId: string): Promise<void>;
}
