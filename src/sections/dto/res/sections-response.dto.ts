import { Expose, Type } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

class ModuleResponseDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  description: string;
}

export class SectionResponseDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @Type(() => ModuleResponseDto)
  modules: ModuleResponseDto[];
}
