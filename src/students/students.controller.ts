import {
  Controller,
  Patch,
  Param,
  Body,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../_common/decorators/roles.decorator';
import {
  UpdateStudentBatchYearDto,
  UpdateStudentMembershipDto,
} from './dto/update-student.dto';
import { StudentsService } from 'src/students/students.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @Roles('ADMIN')
  @Patch(':userId/batch-year')
  async updateBatchYear(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateDto: UpdateStudentBatchYearDto,
  ) {
    return this.studentService.updateBatchYear(userId, updateDto);
  }

  @Roles('ADMIN')
  @Patch(':userId/membership-status')
  async updateMembershipStatus(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateDto: UpdateStudentMembershipDto,
  ) {
    return this.studentService.updateMembershipStatus(userId, updateDto);
  }
}
