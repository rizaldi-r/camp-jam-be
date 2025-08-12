// src/auth/strategies/jwt-refresh.strategy.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadItf } from 'src/_common/types/payload.type';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_REFRESH_SECRET');
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

  validate(payload: PayloadItf) {
    return payload;
  }
}
