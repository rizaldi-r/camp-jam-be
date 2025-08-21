import { Program } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { UserResponseDto } from 'src/user/dto/res/user-response-body.dto';

export class InstructorResponseDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  userTitle: string | null;

  @Expose()
  @IsEnum(Program)
  program: Program;

  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;
}
