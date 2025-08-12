import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Type,
  UnauthorizedException,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import {
  IS_ADMIN_BYPASS_ENABLED_KEY,
  OwnableResource,
  OwnableService,
  OWNER_SERVICE_KEY,
  idSourceConfigItf,
  ID_SOURCE_CONFIG_KEY,
} from '../types/resource-owner.type';
import { RequestType } from 'src/_common/types/request.type';

@Injectable()
export class ResourceOwnershipGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private moduleRef: ModuleRef,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest<RequestType>();
    if (!request.user || !request.user.id)
      throw new UnauthorizedException(
        'User ID not found in request.user. Ensure JWT payload includes userId.',
      );
    const user = request.user;

    // get metadata that allow bypass
    const idSourceConfig = this.reflector.getAllAndOverride<idSourceConfigItf>(
      ID_SOURCE_CONFIG_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );
    const isAllowAdminBypass = this.reflector.getAllAndOverride<boolean>(
      IS_ADMIN_BYPASS_ENABLED_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );

    // allow bypass
    if (
      (isAllowAdminBypass && user.role === UserRole.ADMIN) ||
      !idSourceConfig
    ) {
      return true;
    }

    // Get service type
    const serviceType = this.reflector.getAllAndOverride<Type<OwnableService>>(
      OWNER_SERVICE_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );
    if (!serviceType) {
      throw new Error('OwnerService decorator not applied to this route.');
    }

    // Extract Resource ID
    const { idSource, idType, queryParamName } = idSourceConfig;
    let resourceId: string;
    switch (idType) {
      case 'param':
        resourceId = request.params.id;
        if (!resourceId) {
          throw new BadRequestException(
            'Invalid resource ID from URL parameter. ID cannot be null or empty.',
          );
        }
        break;

      case 'query':
        if (!queryParamName) {
          throw new Error(
            'IdSource configured as "query" but no queryParamName provided.',
          );
        }
        resourceId = request.query[queryParamName] as string;
        if (!resourceId) {
          return true;
        }
        break;

      case 'body':
        if (!queryParamName) {
          throw new Error(
            'IdSource configured as "body" but no queryParamName provided.',
          );
        }
        resourceId = (request.body as Record<string, any>)[
          queryParamName
        ] as string;
        if (!resourceId) {
          throw new BadRequestException(
            'Invalid resource ID from body parameter. ID cannot be null or empty.',
          );
        }
        break;

      default:
        throw new Error('Unsupported IdSource type provided.');
    }

    // Get the Service
    let resourceService: OwnableService;
    try {
      resourceService = this.moduleRef.get(serviceType, { strict: false });
    } catch (error) {
      console.error(`Failed to resolve service ${serviceType.name}:`, error);
      throw new Error(
        `Internal server error: Could not resolve service for resource ownership check.`,
      );
    }

    // Ensure the service has a findById method
    if (typeof resourceService.findById !== 'function') {
      throw new Error(
        `Service ${serviceType.name} must have a 'findById' method.`,
      );
    }

    // Fetch the resource
    const resource: OwnableResource =
      await resourceService.findById(resourceId);

    // Check Ownership
    const userIdSource = idSource === 'user' ? 'Id' : idSource;
    if (user[userIdSource] === resource[`${idSource}Id`]) {
      return true;
    }

    // If not owner and not an admin, throw forbidden
    throw new ForbiddenException(
      `You do not have permission to access this resource.`,
    );
  }
}
