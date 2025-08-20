import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Enrollment } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/_common/decorators/roles.decorator';
import { ResourceOwnershipGuard } from 'src/_common/guards/resource-ownership.guard';
import {
  AllowAdminBypassOwnership,
  OwnershipIdSource,
  OwnershipService,
} from 'src/_common/decorators/ownership.decorator';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
import { CurrentUser } from 'src/_common/decorators/current-user.decorator';
import { UserType } from 'src/_common/types/user.type';
import { UpdateEnrollmentDto } from 'src/enrollments/dto/update-enrollment.dto';
import { CreateEnrollmentDto } from 'src/enrollments/dto/create-enrollment.dto';
import { CoursesService } from 'src/courses/courses.service';
import { FindAllEnrollmentQueryDto } from 'src/enrollments/dto/find-enrollment.dto';
import { BodyTransformerInterceptor } from 'src/_common/interceptors/body-transformer.interceptor';

@Controller('enrollments')
@UseInterceptors(BodyTransformerInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard, ResourceOwnershipGuard)
@AllowAdminBypassOwnership()
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @Roles('ADMIN', 'STUDENT')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createEnrollmentDto: CreateEnrollmentDto,
    @CurrentUser() user: UserType,
  ): Promise<Enrollment> {
    return this.enrollmentsService.createEnrollment(
      user.student.id,
      createEnrollmentDto.courseId,
    );
  }

  @Get()
  @Roles('ADMIN')
  findAll(): Promise<Enrollment[]> {
    return this.enrollmentsService.getAllEnrollments();
  }

  @Get('by-course/:courseId')
  @OwnershipService(CoursesService)
  @OwnershipIdSource(['instructor'], 'params', 'courseId')
  findByCourseId(
    @Param('courseId', ParseUUIDPipe) courseId: string,
  ): Promise<Enrollment[]> {
    return this.enrollmentsService.getEnrollmentsByCourseId(courseId);
  }

  @Get('by-student')
  @Roles('STUDENT')
  // @OwnershipService(EnrollmentsService)
  // @OwnershipIdSource(['student'], 'params', 'studentId')
  getEnrollmentsByStudentId(
    @CurrentUser() user: UserType,
    @Query() query: FindAllEnrollmentQueryDto,
  ) {
    return this.enrollmentsService.getEnrollmentsByStudentId(
      user.student.id,
      query,
    );
  }

  @Get(':id')
  @OwnershipService(EnrollmentsService)
  @OwnershipIdSource(['student', 'instructor'], 'params', 'id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Enrollment> {
    return this.enrollmentsService.getEnrollmentById(id);
  }

  @Patch(':id')
  @Roles('INSTRUCTOR', 'ADMIN')
  @OwnershipService(EnrollmentsService)
  @OwnershipIdSource(['instructor'], 'params', 'id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ): Promise<Enrollment> {
    return this.enrollmentsService.updateEnrollment(id, updateEnrollmentDto);
  }

  @Delete(':id')
  @OwnershipService(EnrollmentsService)
  @OwnershipIdSource(['student'], 'params', 'id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<Enrollment> {
    return this.enrollmentsService.deleteEnrollment(id);
  }
}
