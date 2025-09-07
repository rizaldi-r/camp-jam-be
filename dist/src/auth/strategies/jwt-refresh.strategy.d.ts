import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { PayloadItf } from 'src/_common/types/payload.type';
declare const JwtRefreshStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: PayloadItf): PayloadItf;
}
export {};
