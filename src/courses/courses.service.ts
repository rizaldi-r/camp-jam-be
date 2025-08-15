import { Injectable } from '@nestjs/common';
import { ResourceNotFoundException } from '../_common/exceptions/custom-not-found.exception';
import { CreateCourseDto } from 'src/courses/dto/create-course.dto';
import {
  FindAllCoursesQueryDto,
  FindOneCourseDto,
} from 'src/courses/dto/find-course-query.dto';
import { UpdateCourseDto } from 'src/courses/dto/update-course.dto';
import { CoursesRepository } from 'src/courses/courses.repository';
import { InstructorsService } from 'src/instructors/instructors.service';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class CoursesService {
  constructor(
    private readonly coursesRepository: CoursesRepository,
    private readonly instructorsService: InstructorsService,
    private readonly categoriesService: CategoriesService,
  ) {}
  async isInstructorOwner(
    resourceId: string,
    userId: string,
  ): Promise<boolean> {
    const instructorId =
      await this.coursesRepository.findInstructorIdByCourseId(resourceId);
    return instructorId === userId;
  }

  async create(createDto: CreateCourseDto, instructorId: string) {
    const { categoryIds, ...courseData } = createDto;
    return this.coursesRepository.create(courseData, categoryIds, instructorId);
  }

  async findAll(query: FindAllCoursesQueryDto) {
    return this.coursesRepository.findAll(query);
  }

  async findById(id: string, query?: FindOneCourseDto) {
    const course = await this.coursesRepository.findById(id, query);
    if (!course) {
      throw new ResourceNotFoundException('Course', 'id', id);
    }
    return course;
  }

  async update(id: string, updateDto: UpdateCourseDto) {
    await this.findById(id);
    if (updateDto.instructorId) {
      await this.instructorsService.findInstructorById(updateDto.instructorId);
    }
    if (updateDto.categoryIds) {
      await this.categoriesService.findByIdList(updateDto.categoryIds);
    }

    const { categoryIds, ...courseData } = updateDto;
    return this.coursesRepository.update(id, courseData, categoryIds);
  }

  async remove(id: string) {
    await this.findById(id);

    return this.coursesRepository.remove(id);
  }
}
