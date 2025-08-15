import { Module } from '@nestjs/common';
import { SubmissionTemplatesRepository } from 'src/submission-templates/submission-template.repository';
import { SubmissionTemplatesController } from 'src/submission-templates/submission-templates.controller';
import { SubmissionTemplatesService } from 'src/submission-templates/submission-templates.service';

@Module({
  controllers: [SubmissionTemplatesController],
  providers: [SubmissionTemplatesService, SubmissionTemplatesRepository],
})
export class SubmissionTemplatesModule {}
