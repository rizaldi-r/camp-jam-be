import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateSectionDto } from './dto/req/create-section.dto';
import { UpdateSectionDto } from './dto/req/update-section.dto';
import { SectionsService } from 'src/sections/sections.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/_common/decorators/roles.decorator';
import { ResourceOwnershipGuard } from 'src/_common/guards/resource-ownership.guard';
import {
  AllowAdminBypassOwnership,
  OwnershipIdSource,
  OwnershipService,
} from 'src/_common/decorators/ownership.decorator';
import { CoursesService } from 'src/courses/courses.service';

@UseGuards(JwtAuthGuard, RolesGuard, ResourceOwnershipGuard)
@AllowAdminBypassOwnership()
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  @Roles('ADMIN', 'INSTRUCTOR')
  @OwnershipService(CoursesService)
  @OwnershipIdSource('instructor', 'body', 'courseId')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateSectionDto) {
    return this.sectionsService.create(createDto);
  }

  @Get()
  @Roles('ADMIN', 'INSTRUCTOR')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.sectionsService.findAll();
  }

  @Get('by-course/:courseId')
  @HttpCode(HttpStatus.OK)
  async findAllByCourseId(@Param('courseId', ParseUUIDPipe) courseId: string) {
    return this.sectionsService.findAllByCourseId(courseId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.sectionsService.findById(id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'INSTRUCTOR')
  @OwnershipService(SectionsService)
  @OwnershipIdSource('instructor', 'params', 'id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateSectionDto,
  ) {
    return this.sectionsService.update(id, updateDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'INSTRUCTOR')
  @OwnershipService(SectionsService)
  @OwnershipIdSource('instructor', 'params', 'id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.sectionsService.remove(id);
  }
}
