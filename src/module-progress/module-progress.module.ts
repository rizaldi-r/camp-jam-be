import { forwardRef, Module } from '@nestjs/common';
import { ModuleProgressService } from './module-progress.service';
import { ModuleProgressController } from './module-progress.controller';
import { ModuleProgressRepository } from 'src/module-progress/module-progress.repository';
import { EnrollmentsModule } from 'src/enrollments/enrollments.module';
import { ModulesModule } from 'src/modules/modules.module';

@Module({
  imports: [
    forwardRef(() => EnrollmentsModule),
    forwardRef(() => ModulesModule),
  ],
  controllers: [ModuleProgressController],
  providers: [ModuleProgressService, ModuleProgressRepository],
  exports: [ModuleProgressService, ModuleProgressRepository],
})
export class ModuleProgressModule {}
