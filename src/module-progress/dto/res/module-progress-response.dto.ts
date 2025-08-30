import { Expose } from 'class-transformer';
import { IsBoolean, IsUUID } from 'class-validator';

export class ModuleProgressDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsBoolean()
  isCompleted: boolean;

  @Expose()
  @IsUUID()
  moduleId: string;
}
