import { forwardRef, Module } from '@nestjs/common';
import { ModulesController } from 'src/modules/modules.controller';
import { ModulesRepository } from 'src/modules/modules.repository';
import { SubmissionsModule } from 'src/submissions/submissions.module';
import { SubmissionTemplatesModule } from 'src/submission-templates/submission-templates.module';
import { EnrollmentsModule } from 'src/enrollments/enrollments.module';
import { ModulesService } from 'src/modules/modules.service';
import { ModuleProgressModule } from 'src/module-progress/module-progress.module';

@Module({
  imports: [
    forwardRef(() => EnrollmentsModule),
    SubmissionsModule,
    SubmissionTemplatesModule,
    ModuleProgressModule,
  ],
  controllers: [ModulesController],
  providers: [ModulesService, ModulesRepository],
  exports: [ModulesService, ModulesRepository],
})
export class ModulesModule {}
