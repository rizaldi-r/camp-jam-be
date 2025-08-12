import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../_common/decorators/roles.decorator';
import { CreateCourseDto } from 'src/courses/dto/create-course.dto';
import { FindAllCoursesQueryDto } from 'src/courses/dto/find-all-course-query.dto';
import { UpdateCourseDto } from 'src/courses/dto/update-course.dto';
import { CurrentUser } from 'src/_common/decorators/current-user.decorator';
import { UserType } from 'src/_common/types/user.type';
import { ResourceOwnershipGuard } from 'src/_common/guards/resource-owner.guard';
import { OwnershipService } from 'src/_common/decorators/resource-owner/owner-service.decorator';
import { CoursesService } from 'src/courses/courses.service';
import { AllowAdminBypassOwnership } from 'src/_common/decorators/resource-owner/allow-admin-bypass-owner.decorator';

@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard, ResourceOwnershipGuard)
@AllowAdminBypassOwnership()
@OwnershipService(CoursesService)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @Roles('ADMIN', 'INSTRUCTOR')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createDto: CreateCourseDto,
    @CurrentUser() user: UserType,
  ) {
    return this.coursesService.create(createDto, user.instructor.id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: FindAllCoursesQueryDto) {
    return this.coursesService.findAll(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.coursesService.findById(id);
  }

  // TODO: ownership
  @Patch(':id')
  @Roles('ADMIN', 'INSTRUCTOR')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(id, updateDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.coursesService.remove(id);
  }
}
