import { MembershipStatus } from '@prisma/client';
import { UserResponseDto } from 'src/user/dto/res/user-response-body.dto';
export declare class StudentResponseDto {
    id: string;
    program: string;
    batchYear: number;
    membershipStatus: MembershipStatus;
    createdAt: Date;
    updatedAt: Date;
    user: UserResponseDto;
}
