import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsRepository } from 'src/submissions/submissions.repository';
import { SubmissionTemplatesModule } from 'src/submission-templates/submission-templates.module';

@Module({
  imports: [SubmissionTemplatesModule],
  controllers: [SubmissionsController],
  providers: [SubmissionsService, SubmissionsRepository],
  exports: [SubmissionsService, SubmissionsRepository],
})
export class SubmissionsModule {}
