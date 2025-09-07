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
exports.SectionsController = void 0;
const common_1 = require("@nestjs/common");
const create_section_dto_1 = require("./dto/req/create-section.dto");
const update_section_dto_1 = require("./dto/req/update-section.dto");
const sections_service_1 = require("./sections.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const roles_decorator_1 = require("../_common/decorators/roles.decorator");
const resource_ownership_guard_1 = require("../_common/guards/resource-ownership.guard");
const ownership_decorator_1 = require("../_common/decorators/ownership.decorator");
const courses_service_1 = require("../courses/courses.service");
let SectionsController = class SectionsController {
    sectionsService;
    constructor(sectionsService) {
        this.sectionsService = sectionsService;
    }
    async create(createDto) {
        return this.sectionsService.create(createDto);
    }
    async findAll() {
        return this.sectionsService.findAll();
    }
    async findAllByCourseId(courseId) {
        return this.sectionsService.findAllByCourseId(courseId);
    }
    async findOne(id) {
        return this.sectionsService.findById(id);
    }
    async update(id, updateDto) {
        return this.sectionsService.update(id, updateDto);
    }
    async remove(id) {
        return this.sectionsService.remove(id);
    }
};
exports.SectionsController = SectionsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, ownership_decorator_1.OwnershipService)(courses_service_1.CoursesService),
    (0, ownership_decorator_1.OwnershipIdSource)(['instructor'], 'body', 'courseId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_section_dto_1.CreateSectionDto]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('by-course/:courseId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "findAllByCourseId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, ownership_decorator_1.OwnershipService)(sections_service_1.SectionsService),
    (0, ownership_decorator_1.OwnershipIdSource)(['instructor'], 'params', 'id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_section_dto_1.UpdateSectionDto]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, ownership_decorator_1.OwnershipService)(sections_service_1.SectionsService),
    (0, ownership_decorator_1.OwnershipIdSource)(['instructor'], 'params', 'id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "remove", null);
exports.SectionsController = SectionsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard, resource_ownership_guard_1.ResourceOwnershipGuard),
    (0, ownership_decorator_1.AllowAdminBypassOwnership)(),
    (0, common_1.Controller)('sections'),
    __metadata("design:paramtypes", [sections_service_1.SectionsService])
], SectionsController);
//# sourceMappingURL=sections.controller.js.map