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
exports.SubmissionTemplatesService = void 0;
const common_1 = require("@nestjs/common");
const custom_not_found_exception_1 = require("../_common/exceptions/custom-not-found.exception");
const submission_template_repository_1 = require("./submission-template.repository");
let SubmissionTemplatesService = class SubmissionTemplatesService {
    submissionTemplatesRepository;
    constructor(submissionTemplatesRepository) {
        this.submissionTemplatesRepository = submissionTemplatesRepository;
    }
    async isInstructorOwner(templateId, instructorId) {
        const ownerId = await this.submissionTemplatesRepository.getOwnerId(templateId);
        return ownerId === instructorId;
    }
    async createTemplate(data) {
        return this.submissionTemplatesRepository.create(data);
    }
    async getAllTemplates() {
        return this.submissionTemplatesRepository.findAll();
    }
    async getTemplateById(id) {
        const template = await this.submissionTemplatesRepository.findById(id);
        if (!template) {
            throw new custom_not_found_exception_1.ResourceNotFoundException('SubmissionTemplate', 'id', id);
        }
        return template;
    }
    async getTemplateByModuleId(moduleId) {
        const template = await this.submissionTemplatesRepository.findByModuleId(moduleId);
        if (!template) {
            throw new custom_not_found_exception_1.ResourceNotFoundException('SubmissionTemplate', 'moduleId', moduleId);
        }
        return template;
    }
    async getTemplateByCourseId(courseId) {
        const template = await this.submissionTemplatesRepository.findByCourseId(courseId);
        if (!template) {
            throw new custom_not_found_exception_1.ResourceNotFoundException('SubmissionTemplate', 'courseId', courseId);
        }
        return template;
    }
    async getSubmissionFieldsByTemplateId(templateId) {
        await this.getTemplateById(templateId);
        return this.submissionTemplatesRepository.findFieldsByTemplateId(templateId);
    }
    async updateTemplate(id, data) {
        await this.getTemplateById(id);
        return this.submissionTemplatesRepository.update(id, data);
    }
    async deleteTemplate(id) {
        await this.getTemplateById(id);
        return this.submissionTemplatesRepository.delete(id);
    }
};
exports.SubmissionTemplatesService = SubmissionTemplatesService;
exports.SubmissionTemplatesService = SubmissionTemplatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [submission_template_repository_1.SubmissionTemplatesRepository])
], SubmissionTemplatesService);
//# sourceMappingURL=submission-templates.service.js.map