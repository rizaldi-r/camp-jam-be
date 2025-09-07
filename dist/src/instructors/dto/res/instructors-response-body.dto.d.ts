import { Program } from '@prisma/client';
import { UserResponseDto } from 'src/user/dto/res/user-response-body.dto';
export declare class InstructorResponseDto {
    id: string;
    userTitle: string | null;
    program: Program;
    user: UserResponseDto;
}
