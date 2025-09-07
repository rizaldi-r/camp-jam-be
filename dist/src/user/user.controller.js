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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const update_user_dto_1 = require("./dto/req/update-user.dto");
const role_guard_1 = require("../auth/guards/role.guard");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const body_transformer_interceptor_1 = require("../_common/interceptors/body-transformer.interceptor");
const roles_decorator_1 = require("../_common/decorators/roles.decorator");
const current_user_decorator_1 = require("../_common/decorators/current-user.decorator");
const find_all_users_query_dto_1 = require("./dto/req/find-all-users-query.dto");
const check_user_availability_dto_1 = require("./dto/req/check-user-availability.dto");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async findAll(query) {
        return this.userService.findAll(query);
    }
    async getProfile(user) {
        return this.userService.findById(user.id);
    }
    async checkEmailAvailability(query) {
        const isAvailable = await this.userService.isEmailAvailable(query.email);
        return { isAvailable };
    }
    async checkUsernameAvailability(query) {
        const isAvailable = await this.userService.isUsernameAvailable(query.username);
        return { isAvailable };
    }
    async updateProfile(user, updateUserDto) {
        return this.userService.update(user.id, updateUserDto);
    }
    async updateUserRole(id, updateUserRoleDto) {
        return this.userService.updateUserRole(id, updateUserRoleDto);
    }
    async removeCurrentUser(user) {
        return this.userService.remove(user.id);
    }
    async remove(id) {
        return this.userService.remove(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_all_users_query_dto_1.FindAllUsersQueryDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/profile'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('check-email'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_user_availability_dto_1.CheckEmailAvailabilityDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "checkEmailAvailability", null);
__decorate([
    (0, common_1.Get)('check-username'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_user_availability_dto_1.CheckUsernameAvailabilityDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "checkUsernameAvailability", null);
__decorate([
    (0, common_1.Patch)('/profile'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Patch)(':id/role'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserRoleDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserRole", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "removeCurrentUser", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)(body_transformer_interceptor_1.BodyTransformerInterceptor),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map