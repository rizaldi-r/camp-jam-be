// src/submission-template/submission-template.controller.ts

import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSubmissionTemplateDto } from 'src/submission-templates/dto/create-submission-template.dto';
import { ResourceOwnershipGuard } from 'src/_common/guards/resource-ownership.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UpdateSubmissionTemplateDto } from 'src/submission-templates/dto/update-submission-template.dto';
import { Roles } from 'src/_common/decorators/roles.decorator';
import {
  AllowAdminBypassOwnership,
  OwnershipIdSource,
  OwnershipService,
} from 'src/_common/decorators/ownership.decorator';
import { ModulesService } from 'src/modules/modules.service';
import { SubmissionTemplate } from '@prisma/client';
import { SubmissionTemplatesService } from 'src/submission-templates/submission-templates.service';

@Controller('submission-templates')
@UseGuards(JwtAuthGuard, RolesGuard, ResourceOwnershipGuard)
@AllowAdminBypassOwnership()
export class SubmissionTemplatesController {
  constructor(
    private readonly submissionTemplatesService: SubmissionTemplatesService,
  ) {}

  @Post()
  @Roles('ADMIN', 'INSTRUCTOR')
  @OwnershipService(ModulesService)
  @OwnershipIdSource('instructor', 'body', 'moduleId')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSubmissionTemplateDto: CreateSubmissionTemplateDto) {
    return this.submissionTemplatesService.createTemplate(
      createSubmissionTemplateDto,
    );
  }

  @Roles('ADMIN', 'INSTRUCTOR')
  @Get()
  async findAll(): Promise<SubmissionTemplate[] | null> {
    return this.submissionTemplatesService.getAllTemplates();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SubmissionTemplate | null> {
    return this.submissionTemplatesService.getTemplateById(id);
  }

  @Get('by-module/:moduleId')
  findByModuleId(@Param('moduleId', ParseUUIDPipe) moduleId: string) {
    return this.submissionTemplatesService.getTemplateByModuleId(moduleId);
  }

  @Patch(':id')
  @Roles('ADMIN', 'INSTRUCTOR')
  @OwnershipService(SubmissionTemplatesService)
  @OwnershipIdSource('instructor', 'params', 'id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSubmissionTemplateDto: UpdateSubmissionTemplateDto,
  ) {
    return this.submissionTemplatesService.updateTemplate(
      id,
      updateSubmissionTemplateDto,
    );
  }

  @Delete(':id')
  @Roles('ADMIN', 'INSTRUCTOR')
  @OwnershipService(SubmissionTemplatesService)
  @OwnershipIdSource('instructor', 'params', 'id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.submissionTemplatesService.deleteTemplate(id);
  }
}
