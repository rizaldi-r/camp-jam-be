import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { StudentsRepository } from 'src/students/students.repository';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, StudentsRepository],
  exports: [StudentsService, StudentsRepository],
})
export class StudentsModule {}
