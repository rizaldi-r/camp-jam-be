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
import { CreateSubmissionDto } from 'src/submissions/dto/create-submission.dto';
import { SubmissionsService } from 'src/submissions/submissions.service';
import {
  GradeSubmissionDto,
  UpdateSubmissionDto,
} from 'src/submissions/dto/update-submission.dto';

@Controller('submissions')
@UseGuards(JwtAuthGuard, RolesGuard, ResourceOwnershipGuard)
@AllowAdminBypassOwnership()
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  @Roles('STUDENT')
  // @OwnershipService(ModulesService)
  // @OwnershipIdSource('body', 'enrollmentId')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createSubmissionDto: CreateSubmissionDto,
    // @User() user: IJwtPayload,
  ): Promise<Submission> {
    // The studentId is taken from the JWT payload for security, not the request body.
    // createSubmissionDto.studentId = user.sub;
    return this.submissionsService.createSubmission(createSubmissionDto);
  }

  @Get()
  @Roles('ADMIN')
  findAll(): Promise<Submission[]> {
    return this.submissionsService.getAllSubmissions();
  }

  @Get(':id')
  @OwnershipService(SubmissionsService)
  @OwnershipIdSource('student', 'params', 'id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Submission> {
    return this.submissionsService.getSubmissionById(id);
  }

  @Patch(':id')
  @Roles('STUDENT')
  @OwnershipService(SubmissionsService)
  @OwnershipIdSource('student', 'params', 'id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSubmissionDto: UpdateSubmissionDto,
  ): Promise<Submission> {
    return this.submissionsService.updateSubmission(id, updateSubmissionDto);
  }

  @Delete(':id')
  @Roles('STUDENT')
  @OwnershipService(SubmissionsService)
  @OwnershipIdSource('student', 'params', 'id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<Submission> {
    return this.submissionsService.deleteSubmission(id);
  }

  @Patch('grade/:id')
  @Roles('INSTRUCTOR', 'ADMIN')
  @OwnershipService(SubmissionsService)
  @OwnershipIdSource('instructor', 'params', 'id')
  grade(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() gradeSubmissionDto: GradeSubmissionDto,
  ): Promise<Submission> {
    return this.submissionsService.gradeSubmission(id, gradeSubmissionDto);
  }
}
