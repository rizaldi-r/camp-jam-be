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
exports.SubmissionTemplatesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_submission_template_dto_1 = require("./dto/create-submission-template.dto");
const resource_ownership_guard_1 = require("../_common/guards/resource-ownership.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const update_submission_template_dto_1 = require("./dto/update-submission-template.dto");
const roles_decorator_1 = require("../_common/decorators/roles.decorator");
const ownership_decorator_1 = require("../_common/decorators/ownership.decorator");
const modules_service_1 = require("../modules/modules.service");
const submission_templates_service_1 = require("./submission-templates.service");
let SubmissionTemplatesController = class SubmissionTemplatesController {
    submissionTemplatesService;
    constructor(submissionTemplatesService) {
        this.submissionTemplatesService = submissionTemplatesService;
    }
    create(createSubmissionTemplateDto) {
        return this.submissionTemplatesService.createTemplate(createSubmissionTemplateDto);
    }
    async findAll() {
        return this.submissionTemplatesService.getAllTemplates();
    }
    async findOne(id) {
        return this.submissionTemplatesService.getTemplateById(id);
    }
    findByModuleId(moduleId) {
        return this.submissionTemplatesService.getTemplateByModuleId(moduleId);
    }
    findByCourseId(courseId) {
        return this.submissionTemplatesService.getTemplateByCourseId(courseId);
    }
    update(id, updateSubmissionTemplateDto) {
        return this.submissionTemplatesService.updateTemplate(id, updateSubmissionTemplateDto);
    }
    remove(id) {
        return this.submissionTemplatesService.deleteTemplate(id);
    }
};
exports.SubmissionTemplatesController = SubmissionTemplatesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, ownership_decorator_1.OwnershipService)(modules_service_1.ModulesService),
    (0, ownership_decorator_1.OwnershipIdSource)(['instructor'], 'body', 'moduleId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_submission_template_dto_1.CreateSubmissionTemplateDto]),
    __metadata("design:returntype", void 0)
], SubmissionTemplatesController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubmissionTemplatesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubmissionTemplatesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('by-module/:moduleId'),
    __param(0, (0, common_1.Param)('moduleId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubmissionTemplatesController.prototype, "findByModuleId", null);
__decorate([
    (0, common_1.Get)('by-course/:courseId'),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubmissionTemplatesController.prototype, "findByCourseId", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, ownership_decorator_1.OwnershipService)(submission_templates_service_1.SubmissionTemplatesService),
    (0, ownership_decorator_1.OwnershipIdSource)(['instructor'], 'params', 'id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_submission_template_dto_1.UpdateSubmissionTemplateDto]),
    __metadata("design:returntype", void 0)
], SubmissionTemplatesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, ownership_decorator_1.OwnershipService)(submission_templates_service_1.SubmissionTemplatesService),
    (0, ownership_decorator_1.OwnershipIdSource)(['instructor'], 'params', 'id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubmissionTemplatesController.prototype, "remove", null);
exports.SubmissionTemplatesController = SubmissionTemplatesController = __decorate([
    (0, common_1.Controller)('submission-templates'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard, resource_ownership_guard_1.ResourceOwnershipGuard),
    (0, ownership_decorator_1.AllowAdminBypassOwnership)(),
    __metadata("design:paramtypes", [submission_templates_service_1.SubmissionTemplatesService])
], SubmissionTemplatesController);
//# sourceMappingURL=submission-templates.controller.js.map