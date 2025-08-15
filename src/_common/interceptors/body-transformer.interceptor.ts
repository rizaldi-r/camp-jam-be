import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { mapEntityToDto } from '../utils/mapper.util';
import { UserResponseDto } from '../../user/dto/res/user-response-body.dto';
import { CourseResponseDto } from 'src/courses/dto/res/courses-response.dto';

@Injectable()
export class BodyTransformerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request: Request = context.switchToHttp().getRequest();

    let dtoClass: any;
    if (request.url.includes('/user')) {
      dtoClass = UserResponseDto;
    } else if (request.url.includes('/courses')) {
      dtoClass = CourseResponseDto;
    }

    return next.handle().pipe(
      map((data) => {
        if (!dtoClass || !data) return data as unknown;

        if (Array.isArray(data)) {
          return data.map((item) => mapEntityToDto(dtoClass, item));
        } else {
          return mapEntityToDto(dtoClass, data);
        }
      }),
    );
  }
}
