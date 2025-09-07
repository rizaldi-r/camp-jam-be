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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModulesService = void 0;
const common_1 = require("@nestjs/common");
const custom_not_found_exception_1 = require("../_common/exceptions/custom-not-found.exception");
const modules_repository_1 = require("./modules.repository");
const submissions_service_1 = require("../submissions/submissions.service");
const submission_templates_service_1 = require("../submission-templates/submission-templates.service");
const enrollments_service_1 = require("../enrollments/enrollments.service");
const client_1 = require("@prisma/client");
const module_progress_service_1 = require("../module-progress/module-progress.service");
let ModulesService = class ModulesService {
    modulesRepository;
    submissionsService;
    submissionTemplatesService;
    enrollmentsService;
    moduleProgressService;
    constructor(modulesRepository, submissionsService, submissionTemplatesService, enrollmentsService, moduleProgressService) {
        this.modulesRepository = modulesRepository;
        this.submissionsService = submissionsService;
        this.submissionTemplatesService = submissionTemplatesService;
        this.enrollmentsService = enrollmentsService;
        this.moduleProgressService = moduleProgressService;
    }
    async isInstructorOwner(resourceId, userId) {
        const instructorId = await this.modulesRepository.findInstructorIdByModuleId(resourceId);
        return instructorId === userId;
    }
    async findCourseByModuleId(moduleId) {
        const course = await this.modulesRepository.findCourseByModuleId(moduleId);
        if (!course) {
            throw new custom_not_found_exception_1.ResourceNotFoundException('Course for Module', 'id', moduleId);
        }
        return course;
    }
    async create(createDto) {
        const { submissionTemplate, ...moduleData } = createDto;
        const newModule = await this.modulesRepository.create(moduleData);
        const course = await this.modulesRepository.findCourseByModuleId(newModule.id);
        if (!course) {
            throw new custom_not_found_exception_1.ResourceNotFoundException('Course', 'moduleId', newModule.id);
        }
        const enrollments = await this.enrollmentsService.getEnrollmentsByCourseId(course.id);
        if (newModule.moduleType === client_1.ModuleType.ASSIGNMENT) {
            if (!submissionTemplate) {
                throw new common_1.BadRequestException('need to add submissionTemplate for assignment');
            }
            const newSubmissionTemplate = await this.submissionTemplatesService.createTemplate({
                ...submissionTemplate,
                moduleId: newModule.id,
            });
            const submissionFields = await this.submissionTemplatesService.getSubmissionFieldsByTemplateId(newSubmissionTemplate.id);
            const submissionFieldValueData = submissionFields.map((field) => ({
                submissionFieldId: field.id,
                submitted: '',
            }));
            await Promise.all(enrollments.map((enrollment) => this.submissionsService.createSubmission(enrollment.studentId, {
                moduleId: newModule.id,
                enrollmentId: enrollment.id,
                scoreTotal: newSubmissionTemplate.scoreTotal || 100,
                submissionFieldValueData,
            })));
        }
        await Promise.all(enrollments.map((enrollment) => this.moduleProgressService.createModuleProgress({
            enrollmentId: enrollment.id,
            moduleId: newModule.id,
        })));
        return newModule;
    }
    async findByCourse(courseId) {
        return this.modulesRepository.findByCourseId(courseId);
    }
    async findBySection(sectionId) {
        const modules = await this.modulesRepository.findBySectionId(sectionId);
        return modules;
    }
    async findAll(sectionId) {
        const modules = await this.modulesRepository.findAll(sectionId);
        return modules;
    }
    async findById(id) {
        const module = await this.modulesRepository.findById(id);
        if (!module) {
            throw new custom_not_found_exception_1.ResourceNotFoundException('Module', 'id', id);
        }
        return module;
    }
    async update(id, updateDto) {
        await this.findById(id);
        const updatedModule = await this.modulesRepository.update(id, updateDto);
        return updatedModule;
    }
    async remove(id) {
        const module = await this.modulesRepository.findById(id);
        if (!module) {
            throw new custom_not_found_exception_1.ResourceNotFoundException('Module', 'id', id);
        }
        const removedModule = await this.modulesRepository.remove(id);
        return removedModule;
    }
};
exports.ModulesService = ModulesService;
exports.ModulesService = ModulesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [modules_repository_1.ModulesRepository,
        submissions_service_1.SubmissionsService,
        submission_templates_service_1.SubmissionTemplatesService,
        enrollments_service_1.EnrollmentsService,
        module_progress_service_1.ModuleProgressService])
], ModulesService);
//# sourceMappingURL=modules.service.js.map