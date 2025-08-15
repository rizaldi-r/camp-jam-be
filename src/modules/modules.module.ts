import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from 'src/modules/modules.controller';
import { ModulesRepository } from 'src/modules/modules.repository';

@Module({
  controllers: [ModulesController],
  providers: [ModulesService, ModulesRepository],
})
export class ModulesModule {}
