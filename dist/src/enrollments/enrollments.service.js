"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const custom_not_found_exception_1 = require("../_common/exceptions/custom-not-found.exception");
const courses_service_1 = require("../courses/courses.service");
const enrollments_repository_1 = require("./enrollments.repository");
const module_progress_service_1 = require("../module-progress/module-progress.service");
const modules_service_1 = require("../modules/modules.service");
const submission_templates_service_1 = require("../submission-templates/submission-templates.service");
const submissions_service_1 = require("../submissions/submissions.service");
let EnrollmentsService = class EnrollmentsService {
    enrollmentsRepository;
    coursesService;
    submissionTemplatesService;
    moduleProgressService;
    submissionsService;
    modulesService;
    constructor(enrollmentsRepository, coursesService, submissionTemplatesService, moduleProgressService, submissionsService, modulesService) {
        this.enrollmentsRepository = enrollmentsRepository;
        this.coursesService = coursesService;
        this.submissionTemplatesService = submissionTemplatesService;
        this.moduleProgressService = moduleProgressService;
        this.submissionsService = submissionsService;
        this.modulesService = modulesService;
    }
    async isStudentOwner(enrollmentId, studentId) {
        const ownerId = await this.enrollmentsRepository.getStudentOwnerId(enrollmentId);
        return ownerId === studentId;
    }
    async isInstructorOwner(enrollmentId, instructorId) {
        const ownerId = await this.enrollmentsRepository.getInstructorOwnerId(enrollmentId);
        return ownerId === instructorId;
    }
    async createEnrollment(studentId, courseId) {
        const existingEnrollment = await this.enrollmentsRepository.findByStudentAndCourse(studentId, courseId);
        if (existingEnrollment) {
            throw new common_1.BadRequestException('Student is already enrolled in this course.');
        }
        const course = await this.coursesService.findById(courseId);
        const { instructorId } = course;
        const enrollment = await this.enrollmentsRepository.create({
            studentId,
            instructorId,
            courseId,
        });
        const modules = await this.modulesService.findByCourse(courseId);
        const moduleTotal = modules.length;
        const lectureTotal = modules.filter((m) => m.moduleType === 'LECTURE').length;
        const assignmentTotal = modules.filter((m) => m.moduleType === 'ASSIGNMENT').length;
        const submissionTemplates = await this.submissionTemplatesService.getTemplateByCourseId(courseId);
        const totalAssignmentScore = submissionTemplates.reduce((sum, module) => {
            return sum + (module.scoreTotal ?? 0);
        }, 0);
        await this.enrollmentsRepository.createEnrollmentDataRecords(enrollment.id, moduleTotal, lectureTotal, assignmentTotal, totalAssignmentScore);
        await Promise.all(modules.map((module) => this.moduleProgressService.createModuleProgress({
            enrollmentId: enrollment.id,
            moduleId: module.id,
        })));
        await Promise.all(submissionTemplates.map(async (submissionTemplate) => {
            const submissionFields = await this.submissionTemplatesService.getSubmissionFieldsByTemplateId(submissionTemplate.id);
            const submissionFieldValueData = submissionFields.map((field) => ({
                submissionFieldId: field.id,
            }));
            return this.submissionsService.createSubmission(studentId, {
                enrollmentId: enrollment.id,
                moduleId: submissionTemplate.moduleId,
                scoreTotal: submissionTemplate.scoreTotal,
                submissionFieldValueData,
            });
        }));
        return enrollment;
    }
    async getEnrollmentById(id, query) {
        const enrollment = await this.enrollmentsRepository.findById(id, query);
        if (!enrollment) {
            throw new custom_not_found_exception_1.ResourceNotFoundException('Enrollment', 'id', id);
        }
        return enrollment;
    }
    async getEnrollmentsByStudentId(studentId, query) {
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
        const enrollments = await this.enrollmentsRepository.findByStudentId(studentId, mappedQuery);
        return enrollments;
    }
    async getAllEnrollments() {
        return this.enrollmentsRepository.findAll();
    }
    async getEnrollmentsByCourseId(courseId) {
        return this.enrollmentsRepository.findByCourseId(courseId);
    }
    async getEnrollmentDataAssignmentByEnrollmentId(enrollmentId) {
        const enrollmentData = await this.enrollmentsRepository.getEnrollmentDataAssignmentByEnrollmentId(enrollmentId);
        if (!enrollmentData) {
            throw new custom_not_found_exception_1.ResourceNotFoundException('EnrollmentData', 'enrollment id', enrollmentId);
        }
        return enrollmentData;
    }
    async updateEnrollment(id, data) {
        await this.getEnrollmentById(id);
        return this.enrollmentsRepository.update(id, data);
    }
    async updateEnrollmentProgressAfterGrading(submissionId) {
        const submission = await this.submissionsService.getSubmissionById(submissionId);
        const enrollment = await this.getEnrollmentById(submission.enrollmentId);
        const allAssignmentSubmissions = await this.submissionsService.getSubmissionsByEnrollmentId(enrollment.id);
        let totalScoreAchieved = new client_1.Prisma.Decimal(0);
        let completedAssignments = new client_1.Prisma.Decimal(0);
        for (const sub of allAssignmentSubmissions) {
            if (sub.scoreAchieved !== null) {
                totalScoreAchieved = totalScoreAchieved.plus(sub.scoreAchieved);
                completedAssignments = completedAssignments.plus(1);
            }
        }
        const enrollmentData = await this.getEnrollmentDataAssignmentByEnrollmentId(enrollment.id);
        const totalPossibleScore = enrollmentData.moduleTotal;
        const progressPercentage = totalPossibleScore > 0
            ? (totalScoreAchieved.toNumber() / totalPossibleScore) * 100
            : 0;
        await this.enrollmentsRepository.updateEnrollmentDataAssignment(enrollment.id, {
            progressPercentage: new client_1.Prisma.Decimal(progressPercentage),
            moduleCompleted: new client_1.Prisma.Decimal(totalScoreAchieved),
            moduleTotal: totalPossibleScore,
        });
    }
    async deleteEnrollment(id) {
        await this.getEnrollmentById(id);
        return this.enrollmentsRepository.delete(id);
    }
};
exports.EnrollmentsService = EnrollmentsService;
exports.EnrollmentsService = EnrollmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => submissions_service_1.SubmissionsService))),
    __param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => modules_service_1.ModulesService))),
    __metadata("design:paramtypes", [enrollments_repository_1.EnrollmentsRepository,
        courses_service_1.CoursesService,
        submission_templates_service_1.SubmissionTemplatesService,
        module_progress_service_1.ModuleProgressService,
        submissions_service_1.SubmissionsService,
        modules_service_1.ModulesService])
], EnrollmentsService);
//# sourceMappingURL=enrollments.service.js.map