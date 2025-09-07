import { Type } from '@nestjs/common';
import { Request } from 'express';
export type UserRoleType = 'student' | 'instructor';
export interface OwnershipServiceItf {
    isStudentOwner?: (resourceId: string, userId: string) => Promise<boolean>;
    isInstructorOwner?: (resourceId: string, userId: string) => Promise<boolean>;
}
export declare const ALLOW_ADMIN_BYPASS_OWNERSHIP_KEY = "allowAdminBypassOwnership";
export declare const OWNERSHIP_ID_SOURCE_KEY = "ownershipIdSource";
export declare const OWNERSHIP_SERVICE_KEY = "ownershipService";
export declare const AllowAdminBypassOwnership: () => import("@nestjs/common").CustomDecorator<string>;
export declare const OwnershipIdSource: (userRole: UserRoleType[], source: keyof Request, key: string) => import("@nestjs/common").CustomDecorator<string>;
export declare const OwnershipService: (service: Type<OwnershipServiceItf>) => import("@nestjs/common").CustomDecorator<string>;
