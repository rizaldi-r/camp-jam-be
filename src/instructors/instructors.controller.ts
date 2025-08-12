import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { Roles } from 'src/_common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UpdateInstructorDetailsDto } from 'src/instructors/dto/update-instructor.dto';
import { CurrentUser } from 'src/_common/decorators/current-user.decorator';
import { User } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('INSTRUCTOR')
@Controller('instructors')
export class InstructorsController {
  constructor(private readonly instructorsService: InstructorsService) {}

  @Roles('ADMIN')
  @Patch(':userId')
  async updateInstructorDetailsByUserId(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateDto: UpdateInstructorDetailsDto,
  ) {
    return this.instructorsService.updateInstructorDetails(userId, updateDto);
  }

  @Patch()
  async updateInstructorDetails(
    @CurrentUser() user: User,
    @Body() updateDto: UpdateInstructorDetailsDto,
  ) {
    return this.instructorsService.updateInstructorDetails(user.id, updateDto);
  }
}
