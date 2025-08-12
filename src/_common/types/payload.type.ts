import { UserRole } from '@prisma/client';

export interface PayloadItf {
  id: string;
  email: string;
  role: UserRole;
}
