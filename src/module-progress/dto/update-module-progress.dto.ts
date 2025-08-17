import { PartialType } from '@nestjs/mapped-types';
import { CreateModuleProgressDto } from './create-module-progress.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateModuleProgressDto extends PartialType(
  CreateModuleProgressDto,
) {
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
