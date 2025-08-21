import { Module } from '@nestjs/common';
import { SubmissionFieldsService } from './submission-fields.service';
import { SubmissionFieldsController } from './submission-fields.controller';

@Module({
  controllers: [SubmissionFieldsController],
  providers: [SubmissionFieldsService],
})
export class SubmissionFieldsModule {}
