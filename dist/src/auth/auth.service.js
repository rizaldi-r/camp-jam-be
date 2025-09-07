"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const password_hashing_1 = require("../_common/utils/password-hashing");
const user_repository_1 = require("../user/user.repository");
const client_1 = require("@prisma/client");
const user_service_1 = require("../user/user.service");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    jwtService;
    configService;
    userRepository;
    userService;
    prisma;
    constructor(jwtService, configService, userRepository, userService, prisma) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.userRepository = userRepository;
        this.userService = userService;
        this.prisma = prisma;
    }
    check() {
        return { message: 'Access granted' };
    }
    async generateToken(payload) {
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: this.configService.get('JWT_EXPIRATION_ACCESS', '15m'),
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get('JWT_EXPIRATION_REFRESH', '7d'),
            }),
        ]);
        return { access_token, refresh_token };
    }
    async refresh(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
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
    async register(registerDto) {
        const { password, program, ...otherData } = registerDto;
        const isEmailExist = !(await this.userService.isEmailAvailable(otherData.email));
        const isUsernameExist = !(await this.userService.isUsernameAvailable(otherData.username));
        if (isEmailExist || isUsernameExist)
            throw new common_1.ConflictException('User with this email or username already exists');
        const hashedPassword = await (0, password_hashing_1.hashPassword)(password);
        const user = await this.userRepository.create({
            ...otherData,
            passwordHash: hashedPassword,
            role: client_1.UserRole.STUDENT,
        });
        await this.prisma.student.create({
            data: {
                userId: user.id,
                program: program,
                batchYear: new Date().getFullYear(),
            },
        });
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
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.userRepository.findByEmail(email);
        if (!user)
            throw new common_1.UnauthorizedException('Email not registered');
        const hashedPassword = user.passwordHash;
        if (!hashedPassword)
            throw new common_1.UnauthorizedException('Account has no password set.');
        const isPasswordValid = await (0, password_hashing_1.comparePassword)(password, hashedPassword);
        if (!isPasswordValid)
            throw new common_1.UnauthorizedException('Invalid Credential');
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
    async logout(userId) {
        await this.userRepository.update(userId, {
            refreshToken: null,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        user_repository_1.UserRepository,
        user_service_1.UserService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map