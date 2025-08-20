import { Expose, Type } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';
import { ModuleResponseDto } from 'src/modules/dto/res/module-response.dto';

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
