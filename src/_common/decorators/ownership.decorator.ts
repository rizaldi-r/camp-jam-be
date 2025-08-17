import { SetMetadata, Type } from '@nestjs/common';
import { Request } from 'express';

export type UserRoleType = 'student' | 'instructor';

// TODO: make this itf more flexible
export interface OwnershipServiceItf {
  isStudentOwner?: (resourceId: string, userId: string) => Promise<boolean>;
  isInstructorOwner?: (resourceId: string, userId: string) => Promise<boolean>;
}

export const ALLOW_ADMIN_BYPASS_OWNERSHIP_KEY = 'allowAdminBypassOwnership';
export const OWNERSHIP_ID_SOURCE_KEY = 'ownershipIdSource';
export const OWNERSHIP_SERVICE_KEY = 'ownershipService';

export const AllowAdminBypassOwnership = () =>
  SetMetadata(ALLOW_ADMIN_BYPASS_OWNERSHIP_KEY, true);

export const OwnershipIdSource = (
  userRole: UserRoleType[],
  source: keyof Request,
  key: string,
) => SetMetadata(OWNERSHIP_ID_SOURCE_KEY, [userRole, source, key]);

export const OwnershipService = (service: Type<OwnershipServiceItf>) =>
  SetMetadata(OWNERSHIP_SERVICE_KEY, service);
