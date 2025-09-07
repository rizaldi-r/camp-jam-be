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
exports.InstructorsController = void 0;
const common_1 = require("@nestjs/common");
const instructors_service_1 = require("./instructors.service");
const roles_decorator_1 = require("../_common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const update_instructor_dto_1 = require("./dto/update-instructor.dto");
const current_user_decorator_1 = require("../_common/decorators/current-user.decorator");
let InstructorsController = class InstructorsController {
    instructorsService;
    constructor(instructorsService) {
        this.instructorsService = instructorsService;
    }
    async updateInstructorDetailsByUserId(userId, updateDto) {
        return this.instructorsService.updateInstructorDetails(userId, updateDto);
    }
    async updateInstructorDetails(user, updateDto) {
        return this.instructorsService.updateInstructorDetails(user.id, updateDto);
    }
};
exports.InstructorsController = InstructorsController;
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Patch)(':userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_instructor_dto_1.UpdateInstructorDetailsDto]),
    __metadata("design:returntype", Promise)
], InstructorsController.prototype, "updateInstructorDetailsByUserId", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_instructor_dto_1.UpdateInstructorDetailsDto]),
    __metadata("design:returntype", Promise)
], InstructorsController.prototype, "updateInstructorDetails", null);
exports.InstructorsController = InstructorsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('INSTRUCTOR'),
    (0, common_1.Controller)('instructors'),
    __metadata("design:paramtypes", [instructors_service_1.InstructorsService])
], InstructorsController);
//# sourceMappingURL=instructors.controller.js.map