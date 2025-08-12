import { Injectable } from '@nestjs/common';
import { ResourceNotFoundException } from '../_common/exceptions/custom-not-found.exception';
import { CreateCourseDto } from 'src/courses/dto/create-course.dto';
import { FindAllCoursesQueryDto } from 'src/courses/dto/find-all-course-query.dto';
import { UpdateCourseDto } from 'src/courses/dto/update-course.dto';
import { CoursesRepository } from 'src/courses/courses.repository';

@Injectable()
export class CoursesService {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  async create(createDto: CreateCourseDto, instructorId: string) {
    const { categoryIds, ...courseData } = createDto;
    return this.coursesRepository.create(courseData, categoryIds, instructorId);
  }

  async findAll(query: FindAllCoursesQueryDto) {
    return this.coursesRepository.findAll(query);
  }

  async findById(id: string) {
    const course = await this.coursesRepository.findById(id);
    if (!course) {
      throw new ResourceNotFoundException('Course', 'id', id);
    }
    return course;
  }

  async update(id: string, updateDto: UpdateCourseDto) {
    await this.findById(id);

    const { categoryIds, ...courseData } = updateDto;
    return this.coursesRepository.update(id, courseData, categoryIds);
  }

  async remove(id: string) {
    await this.findById(id);

    return this.coursesRepository.remove(id);
  }
}
