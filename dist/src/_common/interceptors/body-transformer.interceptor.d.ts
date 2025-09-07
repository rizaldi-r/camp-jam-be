import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class BodyTransformerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown>;
}
