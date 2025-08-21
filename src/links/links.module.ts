import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from 'src/links/links.controller';
import { ModulesModule } from 'src/modules/modules.module';

@Module({
  imports: [ModulesModule],
  controllers: [LinksController],
  providers: [LinksService],
})
export class LinksModule {}
