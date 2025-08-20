import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsRepository } from 'src/submissions/submissions.repository';
import { SubmissionTemplatesModule } from 'src/submission-templates/submission-templates.module';
import { EnrollmentsModule } from 'src/enrollments/enrollments.module';

@Module({
  imports: [SubmissionTemplatesModule, EnrollmentsModule],
  controllers: [SubmissionsController],
  providers: [SubmissionsService, SubmissionsRepository],
  exports: [SubmissionsService, SubmissionsRepository],
})
export class SubmissionsModule {}
