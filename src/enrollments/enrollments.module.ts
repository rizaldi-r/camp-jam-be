import { forwardRef, Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsRepository } from 'src/enrollments/enrollments.repository';
import { CoursesModule } from 'src/courses/courses.module';
import { ModulesModule } from 'src/modules/modules.module';
import { SubmissionTemplatesModule } from 'src/submission-templates/submission-templates.module';
import { SubmissionsModule } from 'src/submissions/submissions.module';
import { ModuleProgressModule } from 'src/module-progress/module-progress.module';

@Module({
  imports: [
    forwardRef(() => ModulesModule),
    // ModulesModule,
    CoursesModule,
    SubmissionTemplatesModule,
    SubmissionsModule,
    ModuleProgressModule,
  ],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService, EnrollmentsRepository],
  exports: [EnrollmentsService, EnrollmentsRepository],
})
export class EnrollmentsModule {}
