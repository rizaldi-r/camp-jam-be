import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
export interface OwnershipServiceItf {
    [key: string]: (resourceId: string, userId: string) => Promise<boolean>;
}
export declare class ResourceOwnershipGuard implements CanActivate {
    private reflector;
    private moduleRef;
    constructor(reflector: Reflector, moduleRef: ModuleRef);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
