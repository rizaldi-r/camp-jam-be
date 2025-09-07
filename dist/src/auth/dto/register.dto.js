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
exports.RegisterDto = void 0;
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class RegisterDto {
    username;
    email;
    password;
    firstName;
    lastName;
    program;
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Username is required' }),
    (0, class_validator_1.MinLength)(3, { message: 'Username must be at least 3 characters long' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Username cannot be longer than 50 characters' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please enter a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Email cannot be longer than 100 characters' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    (0, class_validator_1.MaxLength)(255, { message: 'Password cannot be longer than 255 characters' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'First name is required' }),
    (0, class_validator_1.MaxLength)(50, { message: 'First name cannot be longer than 50 characters' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Last name is required' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Last name cannot be longer than 50 characters' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(client_1.Program),
    __metadata("design:type", String)
], RegisterDto.prototype, "program", void 0);
//# sourceMappingURL=register.dto.js.map