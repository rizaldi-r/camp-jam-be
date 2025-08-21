import { PartialType } from '@nestjs/mapped-types';
import { CreateSubdescriptionDto } from './create-subdescription.dto';

export class UpdateSubdescriptionDto extends PartialType(
  CreateSubdescriptionDto,
) {}
