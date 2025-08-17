import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ModuleProgressService } from './module-progress.service';
import { UpdateModuleProgressDto } from './dto/update-module-progress.dto';
import { ModuleProgress } from '@prisma/client';
import { Roles } from 'src/_common/decorators/roles.decorator';
import { ResourceOwnershipGuard } from 'src/_common/guards/resource-ownership.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import {
  AllowAdminBypassOwnership,
  OwnershipIdSource,
  OwnershipService,
} from 'src/_common/decorators/ownership.decorator';

@Controller('module-progress')
@UseGuards(JwtAuthGuard, RolesGuard, ResourceOwnershipGuard)
@AllowAdminBypassOwnership()
export class ModuleProgressController {
  constructor(private readonly moduleProgressService: ModuleProgressService) {}

  @Get()
  @Roles('ADMIN')
  findAll(): Promise<ModuleProgress[]> {
    return this.moduleProgressService.getAllModuleProgress();
  }

  @Get('by-enrollment/:enrollmentId')
  @OwnershipService(ModuleProgressService)
  @OwnershipIdSource(['student'], 'params', 'enrollmentId')
  findByEnrollmentId(
    @Param('enrollmentId', ParseUUIDPipe) enrollmentId: string,
  ): Promise<ModuleProgress[]> {
    return this.moduleProgressService.getModuleProgressByEnrollmentId(
      enrollmentId,
    );
  }

  @Get('by-module/:moduleId')
  findByModuleId(
    @Param('moduleId', ParseUUIDPipe) moduleId: string,
  ): Promise<ModuleProgress[]> {
    return this.moduleProgressService.getModuleProgressByModuleId(moduleId);
  }

  @Get(':id')
  // @OwnershipService(ModuleProgressService)
  // @OwnershipIdSource('student', 'params', 'id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ModuleProgress> {
    return this.moduleProgressService.getModuleProgressById(id);
  }

  @Patch(':id')
  @Roles('STUDENT')
  @OwnershipService(ModuleProgressService)
  @OwnershipIdSource(['student'], 'params', 'id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateModuleProgressDto: UpdateModuleProgressDto,
  ): Promise<ModuleProgress> {
    return this.moduleProgressService.updateModuleProgress(
      id,
      updateModuleProgressDto,
    );
  }

  // @Delete(':id')
  // @Roles('ADMIN', 'INSTRUCTOR')
  // @UseGuards(ResourceOwnershipGuard)
  // @OwnershipService(ModuleProgressService, 'isInstructorOwner')
  // @OwnershipIdSource('params', 'id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // remove(@Param('id', ParseUUIDPipe) id: string): Promise<ModuleProgress> {
  //   return this.moduleProgressService.deleteModuleProgress(id);
  // }
}
