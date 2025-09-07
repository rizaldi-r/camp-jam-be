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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseDto = exports.InstructorDTO = exports.StudentDTO = void 0;
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
class StudentDTO {
    id;
    userId;
    program;
    batchYear;
    membershipStatus;
    createdAt;
    updatedAt;
}
exports.StudentDTO = StudentDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], StudentDTO.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], StudentDTO.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], StudentDTO.prototype, "program", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], StudentDTO.prototype, "batchYear", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], StudentDTO.prototype, "membershipStatus", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], StudentDTO.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], StudentDTO.prototype, "updatedAt", void 0);
class InstructorDTO {
    id;
    userId;
    userTitle;
    createdAt;
    updatedAt;
}
exports.InstructorDTO = InstructorDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], InstructorDTO.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], InstructorDTO.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], InstructorDTO.prototype, "userTitle", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], InstructorDTO.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], InstructorDTO.prototype, "updatedAt", void 0);
class UserResponseDto {
    id;
    username;
    firstName;
    lastName;
    email;
    avatarSrc;
    role;
    passwordHash;
    refreshToken;
    lastLogin;
    createdAt;
    updatedAt;
    student;
    instructor;
    isAvailable;
}
exports.UserResponseDto = UserResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "username", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "firstName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "lastName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], UserResponseDto.prototype, "avatarSrc", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "role", void 0);
__decorate([
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "passwordHash", void 0);
__decorate([
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", Object)
], UserResponseDto.prototype, "refreshToken", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], UserResponseDto.prototype, "lastLogin", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], UserResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], UserResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => StudentDTO),
    __metadata("design:type", StudentDTO)
], UserResponseDto.prototype, "student", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => InstructorDTO),
    __metadata("design:type", InstructorDTO)
], UserResponseDto.prototype, "instructor", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], UserResponseDto.prototype, "isAvailable", void 0);
//# sourceMappingURL=user-response-body.dto.js.map