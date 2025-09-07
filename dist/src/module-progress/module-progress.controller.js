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
exports.ModuleProgressController = void 0;
const common_1 = require("@nestjs/common");
const module_progress_service_1 = require("./module-progress.service");
const update_module_progress_dto_1 = require("./dto/update-module-progress.dto");
const roles_decorator_1 = require("../_common/decorators/roles.decorator");
const resource_ownership_guard_1 = require("../_common/guards/resource-ownership.guard");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const ownership_decorator_1 = require("../_common/decorators/ownership.decorator");
const enrollments_service_1 = require("../enrollments/enrollments.service");
let ModuleProgressController = class ModuleProgressController {
    moduleProgressService;
    constructor(moduleProgressService) {
        this.moduleProgressService = moduleProgressService;
    }
    findAll() {
        return this.moduleProgressService.getAllModuleProgress();
    }
    findByEnrollmentId(enrollmentId) {
        return this.moduleProgressService.getModuleProgressByEnrollmentId(enrollmentId);
    }
    findByModuleId(moduleId) {
        return this.moduleProgressService.getModuleProgressByModuleId(moduleId);
    }
    findOne(id) {
        return this.moduleProgressService.getModuleProgressById(id);
    }
    update(id, updateModuleProgressDto) {
        return this.moduleProgressService.updateModuleProgress(id, updateModuleProgressDto);
    }
};
exports.ModuleProgressController = ModuleProgressController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ModuleProgressController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('by-enrollment/:enrollmentId'),
    (0, ownership_decorator_1.OwnershipService)(enrollments_service_1.EnrollmentsService),
    (0, ownership_decorator_1.OwnershipIdSource)(['student'], 'params', 'enrollmentId'),
    __param(0, (0, common_1.Param)('enrollmentId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ModuleProgressController.prototype, "findByEnrollmentId", null);
__decorate([
    (0, common_1.Get)('by-module/:moduleId'),
    __param(0, (0, common_1.Param)('moduleId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ModuleProgressController.prototype, "findByModuleId", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ModuleProgressController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('STUDENT'),
    (0, ownership_decorator_1.OwnershipService)(module_progress_service_1.ModuleProgressService),
    (0, ownership_decorator_1.OwnershipIdSource)(['student'], 'params', 'id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_module_progress_dto_1.UpdateModuleProgressDto]),
    __metadata("design:returntype", Promise)
], ModuleProgressController.prototype, "update", null);
exports.ModuleProgressController = ModuleProgressController = __decorate([
    (0, common_1.Controller)('module-progress'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard, resource_ownership_guard_1.ResourceOwnershipGuard),
    (0, ownership_decorator_1.AllowAdminBypassOwnership)(),
    __metadata("design:paramtypes", [module_progress_service_1.ModuleProgressService])
], ModuleProgressController);
//# sourceMappingURL=module-progress.controller.js.map