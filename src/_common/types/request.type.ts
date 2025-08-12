import { Request } from 'express';
import { UserType } from 'src/_common/types/user.type';

export type RequestType = Request & { user: UserType };
