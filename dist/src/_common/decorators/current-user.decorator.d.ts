import { ExecutionContext } from '@nestjs/common';
export declare const currentUserFactory: (data: unknown, ctx: ExecutionContext) => Express.User | undefined;
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
