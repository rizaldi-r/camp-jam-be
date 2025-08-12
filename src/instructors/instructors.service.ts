import { Injectable } from '@nestjs/common';
import { Instructor } from '@prisma/client';
import { ResourceNotFoundException } from 'src/_common/exceptions/custom-not-found.exception';
import { UpdateInstructorDetailsDto } from 'src/instructors/dto/update-instructor.dto';
import { InstructorRepository } from 'src/instructors/instructors.repository';

@Injectable()
export class InstructorsService {
  constructor(private readonly instructorRepository: InstructorRepository) {}

  async findInstructorByUserId(userId: string): Promise<Instructor> {
    const instructor =
      await this.instructorRepository.findInstructorByUserId(userId);
    if (!instructor) {
      throw new ResourceNotFoundException('Instructor', 'user id', userId);
    }
    return instructor;
  }

  async updateInstructorDetails(
    userId: string,
    updateDto: UpdateInstructorDetailsDto,
  ) {
    await this.findInstructorByUserId(userId);
    return this.instructorRepository.updateInstructorDetailsByUserId(
      userId,
      updateDto,
    );
  }
}
