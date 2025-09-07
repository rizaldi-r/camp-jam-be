import { Program } from '@prisma/client';
export declare class RegisterDto {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    program: Program;
}
