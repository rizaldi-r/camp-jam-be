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
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../_common/decorators/roles.decorator';
import { CreateCourseDto } from 'src/courses/dto/create-course.dto';
import {
  FindAllCoursesQueryDto,
  FindOneCourseDto,
} from 'src/courses/dto/find-course-query.dto';
import { UpdateCourseDto } from 'src/courses/dto/update-course.dto';
import { CurrentUser } from 'src/_common/decorators/current-user.decorator';
import { UserType } from 'src/_common/types/user.type';
import { BodyTransformerInterceptor } from 'src/_common/interceptors/body-transformer.interceptor';
import { CoursesService } from 'src/courses/courses.service';
import {
  AllowAdminBypassOwnership,
  OwnershipIdSource,
  OwnershipService,
} from 'src/_common/decorators/ownership.decorator';
import { ResourceOwnershipGuard } from 'src/_common/guards/resource-ownership.guard';

@Controller('courses')
@UseInterceptors(BodyTransformerInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard, ResourceOwnershipGuard)
@OwnershipService(CoursesService)
@AllowAdminBypassOwnership()
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
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() query: FindOneCourseDto,
  ) {
    return this.coursesService.findById(id, query);
  }

  @Roles('ADMIN', 'INSTRUCTOR')
  @OwnershipIdSource(['instructor'], 'params', 'id')
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(id, updateDto);
  }

  @Roles('ADMIN', 'INSTRUCTOR')
  @OwnershipIdSource(['instructor'], 'params', 'id')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.coursesService.remove(id);
  }
}
