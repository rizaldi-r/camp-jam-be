import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadItf } from 'src/_common/types/payload.type';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userRepository: UserRepository,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error(
        'JWT_SECRET is not defined in the environment variables.',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  // run whenever user get validated
  async validate(payload: PayloadItf) {
    if (!payload || typeof payload.id !== 'string') {
      throw new UnauthorizedException(
        'Invalid token payload: User ID is missing or malformed.',
      );
    }
    const user = await this.userRepository.findById(payload.id);
    if (!user) throw new UnauthorizedException('User not found');

    // remove password from user object before returning
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _passwordHash, ...result } = user;

    // return to request.user
    return result;
  }
}
