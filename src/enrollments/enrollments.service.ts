import {
  Injectable,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Enrollment, Prisma } from '@prisma/client';
import { ResourceNotFoundException } from 'src/_common/exceptions/custom-not-found.exception';
import { CoursesService } from 'src/courses/courses.service';
import { FindAllEnrollmentQueryDto } from 'src/enrollments/dto/find-enrollment.dto';
import { UpdateEnrollmentDto } from 'src/enrollments/dto/update-enrollment.dto';
import { EnrollmentsRepository } from 'src/enrollments/enrollments.repository';
import { EnrollmentWithProgressIds } from 'src/enrollments/types/enrollments.repository.interface';
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
    private readonly moduleProgressService: ModuleProgressService,
    @Inject(forwardRef(() => SubmissionsService))
    private readonly submissionsService: SubmissionsService,
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
    // Fetch modules to calculate totals
    const modules = await this.modulesService.findByCourse(courseId);
    const moduleTotal = modules.length;
    const lectureTotal = modules.filter(
      (m) => m.moduleType === 'LECTURE',
    ).length;
    const assignmentTotal = modules.filter(
      (m) => m.moduleType === 'ASSIGNMENT',
    ).length;

    // calculate sum of total scores
    const submissionTemplates =
      await this.submissionTemplatesService.getTemplateByCourseId(courseId);
    const totalAssignmentScore = submissionTemplates.reduce((sum, module) => {
      return sum + (module.scoreTotal ?? 0);
    }, 0);

    // Create and link EnrollmentData records with calculated totals
    await this.enrollmentsRepository.createEnrollmentDataRecords(
      enrollment.id,
      moduleTotal,
      lectureTotal,
      assignmentTotal,
      totalAssignmentScore,
    );

    // Create a module progress entry for each module
    await Promise.all(
      modules.map((module) =>
        this.moduleProgressService.createModuleProgress({
          enrollmentId: enrollment.id,
          moduleId: module.id,
        }),
      ),
    );

    // Create submission record
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
          scoreTotal: submissionTemplate.scoreTotal,
          submissionFieldValueData,
        });
      }),
    );

    return enrollment;
  }

  async getEnrollmentById(
    id: string,
    query?: FindAllEnrollmentQueryDto,
  ): Promise<EnrollmentWithProgressIds> {
    const enrollment = await this.enrollmentsRepository.findById(id, query);
    if (!enrollment) {
      throw new ResourceNotFoundException('Enrollment', 'id', id);
    }
    return enrollment;
  }

  async getEnrollmentsByStudentId(
    studentId: string,
    query: FindAllEnrollmentQueryDto,
  ): Promise<Enrollment[]> {
    const { searchQuery, searchBy, sortBy, sortOrder, ...restData } = query;
    const mappedQuery = {
      ...restData,
      ...(searchQuery &&
        searchBy && {
          search: {
            searchQuery,
            searchBy: searchBy,
          },
        }),
      ...(sortBy &&
        sortOrder && {
          sort: {
            sortBy: sortBy,
            sortOrder: sortOrder,
          },
        }),
    };

    const enrollments = await this.enrollmentsRepository.findByStudentId(
      studentId,
      mappedQuery,
    );

    return enrollments;
  }

  async getAllEnrollments(): Promise<Enrollment[]> {
    return this.enrollmentsRepository.findAll();
  }

  async getEnrollmentsByCourseId(courseId: string): Promise<Enrollment[]> {
    return this.enrollmentsRepository.findByCourseId(courseId);
  }

  async getEnrollmentDataAssignmentByEnrollmentId(enrollmentId: string) {
    const enrollmentData =
      await this.enrollmentsRepository.getEnrollmentDataAssignmentByEnrollmentId(
        enrollmentId,
      );
    if (!enrollmentData) {
      throw new ResourceNotFoundException(
        'EnrollmentData',
        'enrollment id',
        enrollmentId,
      );
    }
    return enrollmentData;
  }

  async updateEnrollment(
    id: string,
    data: UpdateEnrollmentDto,
  ): Promise<Enrollment> {
    await this.getEnrollmentById(id);
    return this.enrollmentsRepository.update(id, data);
  }

  async updateEnrollmentProgressAfterGrading(
    submissionId: string,
  ): Promise<void> {
    // 1. Fetch the submission
    const submission =
      await this.submissionsService.getSubmissionById(submissionId);

    // 3. Get all submissions for the enrollment's course to recalculate totals.
    const enrollment = await this.getEnrollmentById(submission.enrollmentId);
    const allAssignmentSubmissions =
      await this.submissionsService.getSubmissionsByEnrollmentId(enrollment.id);

    // 4. Recalculate enrollment metrics based on all submissions.
    let totalScoreAchieved = new Prisma.Decimal(0);
    let completedAssignments = new Prisma.Decimal(0);

    for (const sub of allAssignmentSubmissions) {
      if (sub.scoreAchieved !== null) {
        totalScoreAchieved = totalScoreAchieved.plus(sub.scoreAchieved);
        completedAssignments = completedAssignments.plus(1);
      }
    }

    // 5. Fetch the total assignment score from the enrollment data.
    const enrollmentData = await this.getEnrollmentDataAssignmentByEnrollmentId(
      enrollment.id,
    );
    const totalPossibleScore = enrollmentData.moduleTotal as number;

    // 6. Calculate the new progress percentage.
    const progressPercentage =
      totalPossibleScore > 0
        ? (totalScoreAchieved.toNumber() / totalPossibleScore) * 100
        : 0;

    // 7. Update the enrollment data with the new values.
    await this.enrollmentsRepository.updateEnrollmentDataAssignment(
      enrollment.id,
      {
        progressPercentage: new Prisma.Decimal(progressPercentage),
        moduleCompleted: new Prisma.Decimal(totalScoreAchieved),
        moduleTotal: totalPossibleScore,
      },
    );
  }

  async deleteEnrollment(id: string): Promise<Enrollment> {
    await this.getEnrollmentById(id);
    return this.enrollmentsRepository.delete(id);
  }
}
