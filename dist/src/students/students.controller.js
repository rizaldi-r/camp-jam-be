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
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const roles_decorator_1 = require("../_common/decorators/roles.decorator");
const update_student_dto_1 = require("./dto/update-student.dto");
const students_service_1 = require("./students.service");
let StudentsController = class StudentsController {
    studentService;
    constructor(studentService) {
        this.studentService = studentService;
    }
    async updateBatchYear(userId, updateDto) {
        return this.studentService.updateBatchYear(userId, updateDto);
    }
    async updateMembershipStatus(userId, updateDto) {
        return this.studentService.updateMembershipStatus(userId, updateDto);
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Patch)(':userId/batch-year'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_student_dto_1.UpdateStudentBatchYearDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "updateBatchYear", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Patch)(':userId/membership-status'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_student_dto_1.UpdateStudentMembershipDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "updateMembershipStatus", null);
exports.StudentsController = StudentsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, common_1.Controller)('students'),
    __metadata("design:paramtypes", [students_service_1.StudentsService])
], StudentsController);
//# sourceMappingURL=students.controller.js.map