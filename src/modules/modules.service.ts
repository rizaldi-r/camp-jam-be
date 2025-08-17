import { Injectable } from '@nestjs/common';
import { ResourceNotFoundException } from '../_common/exceptions/custom-not-found.exception';
import { ModulesRepository } from 'src/modules/modules.repository';
import { CreateModuleDto } from 'src/modules/dto/create-module.dto';
import { UpdateModuleDto } from 'src/modules/dto/update-module.dto';
import { SubmissionsService } from 'src/submissions/submissions.service';
import { SubmissionTemplatesService } from 'src/submission-templates/submission-templates.service';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
import { ModuleType } from '@prisma/client';
import { ModuleProgressService } from 'src/module-progress/module-progress.service';

@Injectable()
export class ModulesService {
  constructor(
    private readonly modulesRepository: ModulesRepository,
    private readonly submissionsService: SubmissionsService,
    private readonly submissionTemplatesService: SubmissionTemplatesService,
    private readonly enrollmentsService: EnrollmentsService,
    private readonly moduleProgressService: ModuleProgressService,
  ) {}

  async isInstructorOwner(
    resourceId: string,
    userId: string,
  ): Promise<boolean> {
    const instructorId =
      await this.modulesRepository.findInstructorIdByModuleId(resourceId);
    return instructorId === userId;
  }

  // test
  async findCourseByModuleId(moduleId: string) {
    const course = await this.modulesRepository.findCourseByModuleId(moduleId);
    if (!course) {
      throw new ResourceNotFoundException('Course for Module', 'id', moduleId);
    }
    return course;
  }

  async create(createDto: CreateModuleDto) {
    // TODO: transactions
    // 1. Destructure the DTO to separate module data from submission template data
    const { submissionTemplate, ...moduleData } = createDto;

    // 2. Create the new module
    const newModule = await this.modulesRepository.create(moduleData);

    // 3. Find the course for the new module and its enrollments
    const course = await this.modulesRepository.findCourseByModuleId(
      newModule.id,
    );
    if (!course) {
      throw new ResourceNotFoundException('Course', 'moduleId', newModule.id);
    }
    const enrollments = await this.enrollmentsService.getEnrollmentsByCourseId(
      course.id,
    );

    // 4. Check if the module is an assignment and if a template was provided
    if (newModule.moduleType === ModuleType.ASSIGNMENT && submissionTemplate) {
      // 5. Create the new submission template
      const newSubmissionTemplate =
        await this.submissionTemplatesService.createTemplate({
          ...submissionTemplate,
          moduleId: newModule.id,
        });

      // 6. Get the submission fields from the newly created submission template
      const submissionFields =
        await this.submissionTemplatesService.getSubmissionFieldsByTemplateId(
          newSubmissionTemplate.id,
        );

      const submissionFieldValueData = submissionFields.map((field) => ({
        submissionFieldId: field.id,
        submitted: '', // Initialize submitted content with an empty string
      }));

      // 7. Create a submission for each enrolled student
      await Promise.all(
        enrollments.map((enrollment) =>
          this.submissionsService.createSubmission(enrollment.studentId, {
            moduleId: newModule.id,
            enrollmentId: enrollment.id,
            submissionFieldValueData,
          }),
        ),
      );
    }

    // 8. Create ModuleProgress for each enrolled student
    await Promise.all(
      enrollments.map((enrollment) =>
        this.moduleProgressService.createModuleProgress({
          enrollmentId: enrollment.id,
          moduleId: newModule.id,
        }),
      ),
    );

    return newModule;
  }

  async findByCourse(courseId: string) {
    return this.modulesRepository.findByCourseId(courseId);
  }

  async findBySection(sectionId: string) {
    const modules = await this.modulesRepository.findBySectionId(sectionId);
    return modules;
  }

  async findAll(sectionId?: string) {
    const modules = await this.modulesRepository.findAll(sectionId);
    return modules;
  }

  async findById(id: string) {
    const module = await this.modulesRepository.findById(id);
    if (!module) {
      throw new ResourceNotFoundException('Module', 'id', id);
    }
    return module;
  }

  async update(id: string, updateDto: UpdateModuleDto) {
    await this.findById(id);

    const updatedModule = await this.modulesRepository.update(id, updateDto);
    return updatedModule;
  }

  async remove(id: string) {
    const module = await this.modulesRepository.findById(id);
    if (!module) {
      throw new ResourceNotFoundException('Module', 'id', id);
    }
    const removedModule = await this.modulesRepository.remove(id);
    return removedModule;
  }
}
