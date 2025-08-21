import { Module } from '@nestjs/common';
import { SubdescriptionsService } from './subdescriptions.service';
import { SubdescriptionsController } from 'src/subdescriptions/subdescriptions.controller';
import { ModulesModule } from 'src/modules/modules.module';

@Module({
  imports: [ModulesModule],
  controllers: [SubdescriptionsController],
  providers: [SubdescriptionsService],
})
export class SubdescriptionsModule {}
