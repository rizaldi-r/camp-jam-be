import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PayloadItf } from 'src/_common/types/payload.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // get role from metadata
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    // get the user from request, which is populated by JwtAuthGuard
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as PayloadItf;

    // if no user or no user role, deny access
    if (!user || !user.role) return false;

    // check if the user role is included in the required roles
    return requiredRoles.includes(user.role);
  }
}
