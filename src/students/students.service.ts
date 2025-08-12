import { Injectable } from '@nestjs/common';
import {
  UpdateStudentBatchYearDto,
  UpdateStudentMembershipDto,
} from './dto/update-student.dto';
import { ResourceNotFoundException } from 'src/_common/exceptions/custom-not-found.exception';
import { StudentsRepository } from 'src/students/students.repository';

@Injectable()
export class StudentsService {
  constructor(private readonly studentRepository: StudentsRepository) {}

  async findStudentByUserId(userId: string) {
    const student = await this.studentRepository.findStudentByUserId(userId);
    if (!student) {
      throw new ResourceNotFoundException('Student', 'user id', userId);
    }
    return student;
  }

  async updateBatchYear(userId: string, updateDto: UpdateStudentBatchYearDto) {
    await this.findStudentByUserId(userId);

    return this.studentRepository.updateBatchYearByUserId(
      userId,
      updateDto.batchYear,
    );
  }

  async updateMembershipStatus(
    userId: string,
    updateDto: UpdateStudentMembershipDto,
  ) {
    await this.findStudentByUserId(userId);

    return this.studentRepository.updateMembershipStatusByUserId(
      userId,
      updateDto.membershipStatus,
    );
  }
}
