import { Module } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { InstructorsController } from './instructors.controller';
import { InstructorRepository } from 'src/instructors/instructors.repository';

@Module({
  controllers: [InstructorsController],
  providers: [InstructorsService, InstructorRepository],
  exports: [InstructorsService, InstructorRepository],
})
export class InstructorsModule {}
