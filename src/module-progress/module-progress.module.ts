import { Module } from '@nestjs/common';
import { ModuleProgressService } from './module-progress.service';
import { ModuleProgressController } from './module-progress.controller';
import { ModuleProgressRepository } from 'src/module-progress/module-progress.repository';

@Module({
  controllers: [ModuleProgressController],
  providers: [ModuleProgressService, ModuleProgressRepository],
  exports: [ModuleProgressService, ModuleProgressRepository],
})
export class ModuleProgressModule {}
