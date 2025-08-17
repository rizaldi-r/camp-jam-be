import {
  Controller,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Submission } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/_common/decorators/roles.decorator';
import { ResourceOwnershipGuard } from 'src/_common/guards/resource-ownership.guard';
import {
  AllowAdminBypassOwnership,
  OwnershipIdSource,
  OwnershipService,
} from 'src/_common/decorators/ownership.decorator';
// import { CreateSubmissionDto } from 'src/submissions/dto/create-submission.dto';
import { SubmissionsService } from 'src/submissions/submissions.service';
import {
  GradeSubmissionDto,
  LockSubmissionDto,
  UpdateSubmissionDto,
} from 'src/submissions/dto/update-submission.dto';
import { ModulesService } from 'src/modules/modules.service';
// import { CurrentUser } from 'src/_common/decorators/current-user.decorator';
// import { UserType } from 'src/_common/types/user.type';
// import { EnrollmentsService } from 'src/enrollments/enrollments.service';

@Controller('submissions')
@UseGuards(JwtAuthGuard, RolesGuard, ResourceOwnershipGuard)
@AllowAdminBypassOwnership()
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  // @Post()
  // @Roles('STUDENT', 'ADMIN')
  // @OwnershipService(EnrollmentsService)
  // @OwnershipIdSource(['student'], 'body', 'enrollmentId')
  // @HttpCode(HttpStatus.CREATED)
  // create(
  //   @Body() createSubmissionDto: CreateSubmissionDto,
  //   @CurrentUser() user: UserType,
  // ): Promise<Submission> {
  //   return this.submissionsService.createSubmission(
  //     user.student.id,
  //     createSubmissionDto,
  //   );
  // }

  @Get()
  @Roles('ADMIN')
  findAll(): Promise<Submission[]> {
    return this.submissionsService.getAllSubmissions();
  }

  @Get(':id')
  @OwnershipService(SubmissionsService)
  @OwnershipIdSource(['student'], 'params', 'id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Submission> {
    return this.submissionsService.getSubmissionById(id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'STUDENT')
  @OwnershipService(SubmissionsService)
  @OwnershipIdSource(['student'], 'params', 'id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSubmissionDto: UpdateSubmissionDto,
  ): Promise<Submission> {
    return this.submissionsService.updateSubmission(id, updateSubmissionDto);
  }

  // @Delete(':id')
  // @Roles('ADMIN', 'STUDENT')
  // @OwnershipService(SubmissionsService)
  // @OwnershipIdSource(['student'], 'params', 'id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // remove(@Param('id', ParseUUIDPipe) id: string): Promise<Submission> {
  //   return this.submissionsService.deleteSubmission(id);
  // }

  @Patch(':id/lock')
  @Roles('INSTRUCTOR', 'ADMIN')
  lock(@Param('id') id: string, @Body() lockDto: LockSubmissionDto) {
    return this.submissionsService.lockSubmission(id, lockDto);
  }

  @Patch('modules/:moduleId/lock')
  @Roles('INSTRUCTOR', 'ADMIN')
  @OwnershipService(ModulesService)
  @OwnershipIdSource(['instructor'], 'params', 'moduleId')
  async lockSubmissionsByModuleId(
    @Param('moduleId', ParseUUIDPipe) moduleId: string,
    @Body() lockDto: LockSubmissionDto,
  ) {
    return this.submissionsService.lockSubmissionsByModuleId(
      moduleId,
      lockDto.isLocked,
    );
  }

  @Patch('grade/:id')
  @Roles('INSTRUCTOR', 'ADMIN')
  @OwnershipService(SubmissionsService)
  @OwnershipIdSource(['instructor'], 'params', 'id')
  grade(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() gradeSubmissionDto: GradeSubmissionDto,
  ): Promise<Submission> {
    return this.submissionsService.gradeSubmission(id, gradeSubmissionDto);
  }
}
