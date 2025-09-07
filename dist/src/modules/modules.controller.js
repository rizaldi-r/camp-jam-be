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
exports.ModulesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const resource_ownership_guard_1 = require("../_common/guards/resource-ownership.guard");
const modules_service_1 = require("./modules.service");
const create_module_dto_1 = require("./dto/create-module.dto");
const update_module_dto_1 = require("./dto/update-module.dto");
const ownership_decorator_1 = require("../_common/decorators/ownership.decorator");
const roles_decorator_1 = require("../_common/decorators/roles.decorator");
const sections_service_1 = require("../sections/sections.service");
let ModulesController = class ModulesController {
    modulesService;
    constructor(modulesService) {
        this.modulesService = modulesService;
    }
    findCourseByModuleId(id) {
        return this.modulesService.findCourseByModuleId(id);
    }
    create(createModuleDto) {
        return this.modulesService.create(createModuleDto);
    }
    findAll(sectionId) {
        return this.modulesService.findAll(sectionId);
    }
    findByCourse(courseId) {
        return this.modulesService.findByCourse(courseId);
    }
    findBySection(sectionId) {
        return this.modulesService.findBySection(sectionId);
    }
    findOne(id) {
        return this.modulesService.findById(id);
    }
    update(id, updateModuleDto) {
        return this.modulesService.update(id, updateModuleDto);
    }
    remove(id) {
        return this.modulesService.remove(id);
    }
};
exports.ModulesController = ModulesController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id/course'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModulesController.prototype, "findCourseByModuleId", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, ownership_decorator_1.OwnershipService)(sections_service_1.SectionsService),
    (0, ownership_decorator_1.OwnershipIdSource)(['instructor'], 'body', 'sectionId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_module_dto_1.CreateModuleDto]),
    __metadata("design:returntype", void 0)
], ModulesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    __param(0, (0, common_1.Query)('sectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModulesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('by-course/:courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModulesController.prototype, "findByCourse", null);
__decorate([
    (0, common_1.Get)('by-section/:sectionId'),
    __param(0, (0, common_1.Param)('sectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModulesController.prototype, "findBySection", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModulesController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, ownership_decorator_1.OwnershipService)(modules_service_1.ModulesService),
    (0, ownership_decorator_1.OwnershipIdSource)(['instructor'], 'params', 'id'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_module_dto_1.UpdateModuleDto]),
    __metadata("design:returntype", void 0)
], ModulesController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, ownership_decorator_1.OwnershipService)(modules_service_1.ModulesService),
    (0, ownership_decorator_1.OwnershipIdSource)(['instructor'], 'params', 'id'),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModulesController.prototype, "remove", null);
exports.ModulesController = ModulesController = __decorate([
    (0, common_1.Controller)('modules'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard, resource_ownership_guard_1.ResourceOwnershipGuard),
    (0, ownership_decorator_1.AllowAdminBypassOwnership)(),
    __metadata("design:paramtypes", [modules_service_1.ModulesService])
], ModulesController);
//# sourceMappingURL=modules.controller.js.map