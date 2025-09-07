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
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const roles_decorator_1 = require("../_common/decorators/roles.decorator");
const create_course_dto_1 = require("./dto/create-course.dto");
const find_course_query_dto_1 = require("./dto/find-course-query.dto");
const update_course_dto_1 = require("./dto/update-course.dto");
const current_user_decorator_1 = require("../_common/decorators/current-user.decorator");
const body_transformer_interceptor_1 = require("../_common/interceptors/body-transformer.interceptor");
const courses_service_1 = require("./courses.service");
const ownership_decorator_1 = require("../_common/decorators/ownership.decorator");
const resource_ownership_guard_1 = require("../_common/guards/resource-ownership.guard");
let CoursesController = class CoursesController {
    coursesService;
    constructor(coursesService) {
        this.coursesService = coursesService;
    }
    async create(createDto, user) {
        return this.coursesService.create(createDto, user.instructor.id);
    }
    async createByAdmin(createDto) {
        return this.coursesService.create(createDto, createDto.instructorId);
    }
    async findAll(query) {
        return this.coursesService.findAll(query);
    }
    async findByInstructor(user, query) {
        return this.coursesService.findByInstructorId(user.instructor.id, query);
    }
    async findOne(id, query) {
        return this.coursesService.findById(id, query);
    }
    async update(id, updateDto) {
        return this.coursesService.update(id, updateDto);
    }
    async remove(id) {
        return this.coursesService.remove(id);
    }
};
exports.CoursesController = CoursesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('INSTRUCTOR'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('by-admin'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "createByAdmin", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_course_query_dto_1.FindAllCoursesQueryDto]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('by-instructor'),
    (0, roles_decorator_1.Roles)('INSTRUCTOR'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, find_course_query_dto_1.FindOneCourseDto]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findByInstructor", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, find_course_query_dto_1.FindOneCourseDto]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, ownership_decorator_1.OwnershipIdSource)(['instructor'], 'params', 'id'),
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_course_dto_1.UpdateCourseDto]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, ownership_decorator_1.OwnershipIdSource)(['instructor'], 'params', 'id'),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "remove", null);
exports.CoursesController = CoursesController = __decorate([
    (0, common_1.Controller)('courses'),
    (0, common_1.UseInterceptors)(body_transformer_interceptor_1.BodyTransformerInterceptor),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard, resource_ownership_guard_1.ResourceOwnershipGuard),
    (0, ownership_decorator_1.OwnershipService)(courses_service_1.CoursesService),
    (0, ownership_decorator_1.AllowAdminBypassOwnership)(),
    __metadata("design:paramtypes", [courses_service_1.CoursesService])
], CoursesController);
//# sourceMappingURL=courses.controller.js.map