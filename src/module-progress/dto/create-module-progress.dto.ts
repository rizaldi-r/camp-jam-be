import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateModuleProgressDto {
  @IsNotEmpty()
  @IsUUID()
  enrollmentId: string;

  @IsNotEmpty()
  @IsUUID()
  moduleId: string;
}
