import { PartialType } from '@nestjs/mapped-types';
import { CreateSubmissionFieldDto } from './create-submission-field.dto';

export class UpdateSubmissionFieldDto extends PartialType(CreateSubmissionFieldDto) {}
