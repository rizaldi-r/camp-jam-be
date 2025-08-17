// src/module/module.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { ResourceOwnershipGuard } from 'src/_common/guards/resource-ownership.guard';
import { ModulesService } from 'src/modules/modules.service';
import { CreateModuleDto } from 'src/modules/dto/create-module.dto';
import { UpdateModuleDto } from 'src/modules/dto/update-module.dto';
import {
  AllowAdminBypassOwnership,
  OwnershipIdSource,
  OwnershipService,
} from 'src/_common/decorators/ownership.decorator';
import { Roles } from 'src/_common/decorators/roles.decorator';
import { SectionsService } from 'src/sections/sections.service';

@Controller('modules')
@UseGuards(JwtAuthGuard, RolesGuard, ResourceOwnershipGuard)
@AllowAdminBypassOwnership()
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  // test
  @UseGuards(JwtAuthGuard)
  @Get(':id/course')
  findCourseByModuleId(@Param('id', ParseUUIDPipe) id: string) {
    return this.modulesService.findCourseByModuleId(id);
  }

  @Post()
  @Roles('ADMIN', 'INSTRUCTOR')
  @OwnershipService(SectionsService)
  @OwnershipIdSource(['instructor'], 'body', 'sectionId')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.modulesService.create(createModuleDto);
  }

  @Get()
  @Roles('ADMIN', 'INSTRUCTOR')
  findAll(@Query('sectionId') sectionId?: string) {
    return this.modulesService.findAll(sectionId);
  }

  // TODO: make guard that check if it need membership or not
  @Get('by-course/:courseId')
  findByCourse(@Param('courseId') courseId: string) {
    return this.modulesService.findByCourse(courseId);
  }

  @Get('by-section/:sectionId')
  findBySection(@Param('sectionId') sectionId: string) {
    return this.modulesService.findBySection(sectionId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modulesService.findById(id);
  }

  @Roles('ADMIN', 'INSTRUCTOR')
  @OwnershipService(ModulesService)
  @OwnershipIdSource(['instructor'], 'params', 'id')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.modulesService.update(id, updateModuleDto);
  }

  @Roles('ADMIN', 'INSTRUCTOR')
  @OwnershipService(ModulesService)
  @OwnershipIdSource(['instructor'], 'params', 'id')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.modulesService.remove(id);
  }
}
