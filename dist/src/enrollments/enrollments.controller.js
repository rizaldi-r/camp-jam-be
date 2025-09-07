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
exports.EnrollmentsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const roles_decorator_1 = require("../_common/decorators/roles.decorator");
const resource_ownership_guard_1 = require("../_common/guards/resource-ownership.guard");
const ownership_decorator_1 = require("../_common/decorators/ownership.decorator");
const enrollments_service_1 = require("./enrollments.service");
const current_user_decorator_1 = require("../_common/decorators/current-user.decorator");
const update_enrollment_dto_1 = require("./dto/update-enrollment.dto");
const create_enrollment_dto_1 = require("./dto/create-enrollment.dto");
const courses_service_1 = require("../courses/courses.service");
const find_enrollment_dto_1 = require("./dto/find-enrollment.dto");
const body_transformer_interceptor_1 = require("../_common/interceptors/body-transformer.interceptor");
let EnrollmentsController = class EnrollmentsController {
    enrollmentsService;
    constructor(enrollmentsService) {
        this.enrollmentsService = enrollmentsService;
    }
    create(createEnrollmentDto, user) {
        return this.enrollmentsService.createEnrollment(user.student.id, createEnrollmentDto.courseId);
    }
    findAll() {
        return this.enrollmentsService.getAllEnrollments();
    }
    findByCourseId(courseId) {
        return this.enrollmentsService.getEnrollmentsByCourseId(courseId);
    }
    getEnrollmentsByStudentId(user, query) {
        return this.enrollmentsService.getEnrollmentsByStudentId(user.student.id, query);
    }
    findOne(id, query) {
        return this.enrollmentsService.getEnrollmentById(id, query);
    }
    update(id, updateEnrollmentDto) {
        return this.enrollmentsService.updateEnrollment(id, updateEnrollmentDto);
    }
    remove(id) {
        return this.enrollmentsService.deleteEnrollment(id);
    }
};
exports.EnrollmentsController = EnrollmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'STUDENT'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_enrollment_dto_1.CreateEnrollmentDto, Object]),
    __metadata("design:returntype", Promise)
], EnrollmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EnrollmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('by-course/:courseId'),
    (0, ownership_decorator_1.OwnershipService)(courses_service_1.CoursesService),
    (0, ownership_decorator_1.OwnershipIdSource)(['instructor'], 'params', 'courseId'),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EnrollmentsController.prototype, "findByCourseId", null);
__decorate([
    (0, common_1.Get)('by-student'),
    (0, roles_decorator_1.Roles)('STUDENT'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, find_enrollment_dto_1.FindAllEnrollmentQueryDto]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "getEnrollmentsByStudentId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, ownership_decorator_1.OwnershipService)(enrollments_service_1.EnrollmentsService),
    (0, ownership_decorator_1.OwnershipIdSource)(['student', 'instructor'], 'params', 'id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, find_enrollment_dto_1.FindAllEnrollmentQueryDto]),
    __metadata("design:returntype", Promise)
], EnrollmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('INSTRUCTOR', 'ADMIN'),
    (0, ownership_decorator_1.OwnershipService)(enrollments_service_1.EnrollmentsService),
    (0, ownership_decorator_1.OwnershipIdSource)(['instructor'], 'params', 'id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_enrollment_dto_1.UpdateEnrollmentDto]),
    __metadata("design:returntype", Promise)
], EnrollmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, ownership_decorator_1.OwnershipService)(enrollments_service_1.EnrollmentsService),
    (0, ownership_decorator_1.OwnershipIdSource)(['student'], 'params', 'id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EnrollmentsController.prototype, "remove", null);
exports.EnrollmentsController = EnrollmentsController = __decorate([
    (0, common_1.Controller)('enrollments'),
    (0, common_1.UseInterceptors)(body_transformer_interceptor_1.BodyTransformerInterceptor),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard, resource_ownership_guard_1.ResourceOwnershipGuard),
    (0, ownership_decorator_1.AllowAdminBypassOwnership)(),
    __metadata("design:paramtypes", [enrollments_service_1.EnrollmentsService])
], EnrollmentsController);
//# sourceMappingURL=enrollments.controller.js.map