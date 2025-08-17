import {
  Injectable,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Enrollment } from '@prisma/client';
import { ResourceNotFoundException } from 'src/_common/exceptions/custom-not-found.exception';
import { CoursesService } from 'src/courses/courses.service';
import { UpdateEnrollmentDto } from 'src/enrollments/dto/update-enrollment.dto';
import { EnrollmentsRepository } from 'src/enrollments/enrollments.repository';
import { ModuleProgressService } from 'src/module-progress/module-progress.service';
import { ModulesService } from 'src/modules/modules.service';
import { SubmissionTemplatesService } from 'src/submission-templates/submission-templates.service';
import { SubmissionsService } from 'src/submissions/submissions.service';

@Injectable()
export class EnrollmentsService {
  constructor(
    private readonly enrollmentsRepository: EnrollmentsRepository,
    private readonly coursesService: CoursesService,
    private readonly submissionTemplatesService: SubmissionTemplatesService,
    private readonly submissionsService: SubmissionsService,
    private readonly moduleProgressService: ModuleProgressService,
    @Inject(forwardRef(() => ModulesService))
    private readonly modulesService: ModulesService,
  ) {}

  async isStudentOwner(
    enrollmentId: string,
    studentId: string,
  ): Promise<boolean> {
    const ownerId =
      await this.enrollmentsRepository.getStudentOwnerId(enrollmentId);
    return ownerId === studentId;
  }

  async isInstructorOwner(
    enrollmentId: string,
    instructorId: string,
  ): Promise<boolean> {
    const ownerId =
      await this.enrollmentsRepository.getInstructorOwnerId(enrollmentId);
    return ownerId === instructorId;
  }

  async createEnrollment(
    studentId: string,
    courseId: string,
  ): Promise<Enrollment> {
    // Check for existing enrollment
    const existingEnrollment =
      await this.enrollmentsRepository.findByStudentAndCourse(
        studentId,
        courseId,
      );

    if (existingEnrollment) {
      throw new BadRequestException(
        'Student is already enrolled in this course.',
      );
    }

    // Create the enrollment
    const course = await this.coursesService.findById(courseId);
    const { instructorId } = course;
    const enrollment = await this.enrollmentsRepository.create({
      studentId,
      instructorId,
      courseId,
    });

    // TODO: transactions
    // Create all EnrollmentData records for the new enrollment.
    await this.enrollmentsRepository.createEnrollmentDataRecords(enrollment.id);

    // Create a module progress entry for each module
    const modules = await this.modulesService.findByCourse(courseId);
    await Promise.all(
      modules.map((module) =>
        this.moduleProgressService.createModuleProgress({
          enrollmentId: enrollment.id,
          moduleId: module.id,
        }),
      ),
    );

    // Create submission record
    const submissionTemplates =
      await this.submissionTemplatesService.getTemplateByCourseId(courseId);
    await Promise.all(
      submissionTemplates.map(async (submissionTemplate) => {
        const submissionFields =
          await this.submissionTemplatesService.getSubmissionFieldsByTemplateId(
            submissionTemplate.id,
          );

        const submissionFieldValueData = submissionFields.map((field) => ({
          submissionFieldId: field.id,
        }));

        return this.submissionsService.createSubmission(studentId, {
          enrollmentId: enrollment.id,
          moduleId: submissionTemplate.moduleId,
          submissionFieldValueData,
        });
      }),
    );

    return enrollment;
  }

  async getEnrollmentById(id: string): Promise<Enrollment> {
    const enrollment = await this.enrollmentsRepository.findById(id);
    if (!enrollment) {
      throw new ResourceNotFoundException('Enrollment', 'id', id);
    }
    return enrollment;
  }

  async getEnrollmentsByStudentId(studentId: string): Promise<Enrollment[]> {
    const enrollments =
      await this.enrollmentsRepository.findByStudentId(studentId);
    if (!enrollments || enrollments.length === 0) {
      throw new ResourceNotFoundException('Enrollment', 'studentId', studentId);
    }
    return enrollments;
  }

  async getAllEnrollments(): Promise<Enrollment[]> {
    return this.enrollmentsRepository.findAll();
  }

  async getEnrollmentsByCourseId(courseId: string): Promise<Enrollment[]> {
    return this.enrollmentsRepository.findByCourseId(courseId);
  }

  async updateEnrollment(
    id: string,
    data: UpdateEnrollmentDto,
  ): Promise<Enrollment> {
    await this.getEnrollmentById(id);
    return this.enrollmentsRepository.update(id, data);
  }

  async deleteEnrollment(id: string): Promise<Enrollment> {
    await this.getEnrollmentById(id);
    return this.enrollmentsRepository.delete(id);
  }
}
