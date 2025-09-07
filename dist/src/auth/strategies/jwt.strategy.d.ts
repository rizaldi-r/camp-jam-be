import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { PayloadItf } from 'src/_common/types/payload.type';
import { UserRepository } from 'src/user/user.repository';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private userRepository;
    constructor(configService: ConfigService, userRepository: UserRepository);
    validate(payload: PayloadItf): Promise<{
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        avatarSrc: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        refreshToken: string | null;
        lastLogin: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
