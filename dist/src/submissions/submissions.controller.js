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
exports.SubmissionsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const roles_decorator_1 = require("../_common/decorators/roles.decorator");
const resource_ownership_guard_1 = require("../_common/guards/resource-ownership.guard");
const ownership_decorator_1 = require("../_common/decorators/ownership.decorator");
const submissions_service_1 = require("./submissions.service");
const update_submission_dto_1 = require("./dto/update-submission.dto");
const modules_service_1 = require("../modules/modules.service");
const enrollments_service_1 = require("../enrollments/enrollments.service");
let SubmissionsController = class SubmissionsController {
    submissionsService;
    constructor(submissionsService) {
        this.submissionsService = submissionsService;
    }
    findAll() {
        return this.submissionsService.getAllSubmissions();
    }
    async findOne(id) {
        return this.submissionsService.getSubmissionById(id);
    }
    findByEnrollment(enrollmentId) {
        return this.submissionsService.getSubmissionsByEnrollmentId(enrollmentId);
    }
    update(id, updateSubmissionDto) {
        return this.submissionsService.updateSubmission(id, updateSubmissionDto);
    }
    lock(id, lockDto) {
        return this.submissionsService.lockSubmission(id, lockDto);
    }
    async lockSubmissionsByModuleId(moduleId, lockDto) {
        return this.submissionsService.lockSubmissionsByModuleId(moduleId, lockDto.isLocked);
    }
    grade(id, gradeSubmissionDto) {
        return this.submissionsService.gradeSubmission(id, gradeSubmissionDto);
    }
};
exports.SubmissionsController = SubmissionsController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, ownership_decorator_1.OwnershipService)(submissions_service_1.SubmissionsService),
    (0, ownership_decorator_1.OwnershipIdSource)(['student'], 'params', 'id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('by-enrollment/:enrollmentId'),
    (0, ownership_decorator_1.OwnershipService)(enrollments_service_1.EnrollmentsService),
    (0, ownership_decorator_1.OwnershipIdSource)(['student', 'instructor'], 'params', 'enrollmentId'),
    __param(0, (0, common_1.Param)('enrollmentId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "findByEnrollment", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'STUDENT'),
    (0, ownership_decorator_1.OwnershipService)(submissions_service_1.SubmissionsService),
    (0, ownership_decorator_1.OwnershipIdSource)(['student'], 'params', 'id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_submission_dto_1.UpdateSubmissionDto]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/lock'),
    (0, roles_decorator_1.Roles)('INSTRUCTOR', 'ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_submission_dto_1.LockSubmissionDto]),
    __metadata("design:returntype", void 0)
], SubmissionsController.prototype, "lock", null);
__decorate([
    (0, common_1.Patch)('modules/:moduleId/lock'),
    (0, roles_decorator_1.Roles)('INSTRUCTOR', 'ADMIN'),
    (0, ownership_decorator_1.OwnershipService)(modules_service_1.ModulesService),
    (0, ownership_decorator_1.OwnershipIdSource)(['instructor'], 'params', 'moduleId'),
    __param(0, (0, common_1.Param)('moduleId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_submission_dto_1.LockSubmissionDto]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "lockSubmissionsByModuleId", null);
__decorate([
    (0, common_1.Patch)('grade/:id'),
    (0, roles_decorator_1.Roles)('INSTRUCTOR', 'ADMIN'),
    (0, ownership_decorator_1.OwnershipService)(submissions_service_1.SubmissionsService),
    (0, ownership_decorator_1.OwnershipIdSource)(['instructor'], 'params', 'id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_submission_dto_1.GradeSubmissionDto]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "grade", null);
exports.SubmissionsController = SubmissionsController = __decorate([
    (0, common_1.Controller)('submissions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard, resource_ownership_guard_1.ResourceOwnershipGuard),
    (0, ownership_decorator_1.AllowAdminBypassOwnership)(),
    __metadata("design:paramtypes", [submissions_service_1.SubmissionsService])
], SubmissionsController);
//# sourceMappingURL=submissions.controller.js.map