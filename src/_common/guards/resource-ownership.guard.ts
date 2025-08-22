import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Type,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserRole } from '@prisma/client';
import {
  ALLOW_ADMIN_BYPASS_OWNERSHIP_KEY,
  OWNERSHIP_ID_SOURCE_KEY,
  OWNERSHIP_SERVICE_KEY,
  UserRoleType,
} from 'src/_common/decorators/ownership.decorator';
import { RequestType } from 'src/_common/types/request.type';

export interface OwnershipServiceItf {
  [key: string]: (resourceId: string, userId: string) => Promise<boolean>;
  // isOwnerStudent?: (resourceId: string, userId: string) => Promise<boolean>;
  // isOwnerInstructor?: (resourceId: string, userId: string) => Promise<boolean>;
}

@Injectable()
export class ResourceOwnershipGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private moduleRef: ModuleRef,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestType>();
    const user = request.user;

    // Check if the endpoint allows admin bypass and if the user is an admin
    const allowAdminBypass = this.reflector.getAllAndOverride<boolean>(
      ALLOW_ADMIN_BYPASS_OWNERSHIP_KEY,
      [context.getHandler(), context.getClass()],
    );
    // Get the resource ID source from the metadata
    const idSource = this.reflector.get<[string, keyof Request, string]>(
      OWNERSHIP_ID_SOURCE_KEY,
      context.getHandler(),
    );

    if ((allowAdminBypass && user.role === UserRole.ADMIN) || !idSource) {
      return true;
    }

    const [userRoles, source, key] = idSource;
    const resourceId = (request[source] as Record<string, any>)[key] as string;

    if (!resourceId) {
      throw new BadRequestException(
        `Resource ID not found in request at ${String(source)}.${key}`,
      );
    }

    // Get the ownership service type from the metadata
    const ownershipServiceType = this.reflector.getAllAndOverride<
      Type<OwnershipServiceItf>
    >(OWNERSHIP_SERVICE_KEY, [context.getHandler(), context.getClass()]);

    if (!ownershipServiceType) {
      throw new Error(
        'OwnershipService is not defined for this endpoint. Use @OwnershipService()',
      );
    }

    // Get the ownership service instance from the request app context
    const ownershipService = this.moduleRef.get(ownershipServiceType, {
      strict: false,
    });

    for (const userRole of userRoles) {
      // Dynamically choose the function name based on userRole
      const methodName = `is${userRole.charAt(0).toUpperCase() + userRole.slice(1)}Owner`;
      // Check if the dynamic method exists on the service
      if (typeof ownershipService[methodName] !== 'function') {
        throw new Error(
          `Method '${methodName}' not found on ownership service.`,
        );
      }

      // Check if the user object has the required role property
      if (user[userRole as UserRoleType]) {
        // Perform the ownership check
        try {
          const isOwner = await ownershipService[methodName](
            resourceId,
            user[userRole as UserRoleType].id,
          );
          if (isOwner) {
            return true;
          }
        } catch (error) {
          // If the method is not found or another error occurs, continue to the next role
          console.error(
            `Error during ownership check for role ${userRole}:`,
            error,
          );
        }
      }
    }

    // If no ownership check passed, deny access
    throw new ForbiddenException(
      'You do not have permission to perform this action.',
    );
  }
}
