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
exports.SubmissionsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const custom_not_found_exception_1 = require("../_common/exceptions/custom-not-found.exception");
const enrollments_service_1 = require("../enrollments/enrollments.service");
const submission_templates_service_1 = require("../submission-templates/submission-templates.service");
const submissions_repository_1 = require("./submissions.repository");
let SubmissionsService = class SubmissionsService {
    submissionsRepository;
    submissionTemplatesService;
    enrollmentsService;
    constructor(submissionsRepository, submissionTemplatesService, enrollmentsService) {
        this.submissionsRepository = submissionsRepository;
        this.submissionTemplatesService = submissionTemplatesService;
        this.enrollmentsService = enrollmentsService;
    }
    async isStudentOwner(submissionId, studentId) {
        const ownerId = await this.submissionsRepository.getStudentId(submissionId);
        return ownerId === studentId;
    }
    async isInstructorOwner(submissionId, instructorId) {
        const courseOwnerId = await this.submissionsRepository.getInstructorId(submissionId);
        return courseOwnerId === instructorId;
    }
    async createSubmission(studentId, data) {
        const submissionTemplate = await this.submissionTemplatesService.getTemplateByModuleId(data.moduleId);
        const finalData = {
            ...data,
            studentId,
            submissionTemplateId: submissionTemplate.id,
        };
        return this.submissionsRepository.create(finalData);
    }
    async getSubmissionById(id) {
        const submission = await this.submissionsRepository.findById(id);
        if (!submission) {
            throw new custom_not_found_exception_1.ResourceNotFoundException('Submission', 'id', id);
        }
        return submission;
    }
    async getAllSubmissions() {
        return await this.submissionsRepository.findAll();
    }
    async getSubmissionsByEnrollmentId(enrollmentId) {
        return await this.submissionsRepository.findByEnrollmentId(enrollmentId);
    }
    async updateSubmission(id, data) {
        const submission = await this.getSubmissionById(id);
        if (submission.isLocked) {
            throw new common_1.UnauthorizedException('This submission is locked and cannot be updated.');
        }
        return this.submissionsRepository.update(id, data);
    }
    async gradeSubmission(id, data) {
        const { scoreAchieved, ...otherData } = data;
        await this.getSubmissionById(id);
        const submission = await this.getSubmissionById(id);
        const submissionTemplate = await this.submissionTemplatesService.getTemplateByModuleId(submission.moduleId);
        const scoreTotal = submissionTemplate.scoreTotal;
        const scorePercentage = scoreTotal > 0 ? (scoreAchieved / scoreTotal) * 100 : 0;
        const updatedSubmission = await this.submissionsRepository.update(id, {
            ...otherData,
            isGraded: true,
            scoreAchieved: new client_1.Prisma.Decimal(scoreAchieved),
            scorePercentage: new client_1.Prisma.Decimal(scorePercentage),
        });
        await this.enrollmentsService.updateEnrollmentProgressAfterGrading(id);
        return updatedSubmission;
    }
    async lockSubmission(id, lockData) {
        await this.getSubmissionById(id);
        return this.submissionsRepository.update(id, lockData);
    }
    async lockSubmissionsByModuleId(moduleId, isLocked) {
        await this.submissionsRepository.lockAllByModuleId(moduleId, isLocked);
    }
    async lockSubmissionsByTemplateId(templateId, isLocked) {
        await this.submissionsRepository.lockAllByTemplateId(templateId, isLocked);
    }
    async deleteSubmission(id) {
        await this.getSubmissionById(id);
        return this.submissionsRepository.delete(id);
    }
    async getSubmissionFieldValues(submissionId) {
        await this.getSubmissionById(submissionId);
        return this.submissionsRepository.findFieldValuesBySubmissionId(submissionId);
    }
};
exports.SubmissionsService = SubmissionsService;
exports.SubmissionsService = SubmissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [submissions_repository_1.SubmissionsRepository,
        submission_templates_service_1.SubmissionTemplatesService,
        enrollments_service_1.EnrollmentsService])
], SubmissionsService);
//# sourceMappingURL=submissions.service.js.map