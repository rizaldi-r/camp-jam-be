import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CoursesRepository } from 'src/courses/courses.repository';
import { InstructorsModule } from 'src/instructors/instructors.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [InstructorsModule, CategoriesModule],
  controllers: [CoursesController],
  providers: [CoursesService, CoursesRepository],
})
export class CoursesModule {}
