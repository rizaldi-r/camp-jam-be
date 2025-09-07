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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
const password_hashing_1 = require("../_common/utils/password-hashing");
const client_1 = require("@prisma/client");
const custom_not_found_exception_1 = require("../_common/exceptions/custom-not-found.exception");
const students_repository_1 = require("../students/students.repository");
const instructors_repository_1 = require("../instructors/instructors.repository");
let UserService = class UserService {
    userRepository;
    studentsRepository;
    instructorRepository;
    constructor(userRepository, studentsRepository, instructorRepository) {
        this.userRepository = userRepository;
        this.studentsRepository = studentsRepository;
        this.instructorRepository = instructorRepository;
    }
    async findAll(filters) {
        return this.userRepository.findAll(filters);
    }
    async findById(id) {
        if (id === undefined || id === null) {
            throw new common_1.BadRequestException('User ID cannot be undefined or null.');
        }
        const user = await this.userRepository.findById(id);
        if (!user)
            throw new custom_not_found_exception_1.ResourceNotFoundException('User', 'id', id);
        return user;
    }
    async findByUsername(username) {
        const user = await this.userRepository.findByUsername(username);
        if (!user) {
            throw new custom_not_found_exception_1.ResourceNotFoundException('User', 'username', username);
        }
        return user;
    }
    async findByEmail(email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new custom_not_found_exception_1.ResourceNotFoundException('User', 'email', email);
        }
        return user;
    }
    async isUsernameAvailable(username) {
        if (!username)
            throw new common_1.BadRequestException('Username cannot be empty.');
        const user = await this.userRepository.findByUsername(username);
        return user === null;
    }
    async isEmailAvailable(email) {
        if (!email)
            throw new common_1.BadRequestException('Username cannot be empty.');
        const user = await this.userRepository.findByEmail(email);
        return user === null;
    }
    async update(id, updateUserDto) {
        await this.findById(id);
        const { userRole, password, email, username, ...otherData } = updateUserDto;
        if (email) {
            const existingEmail = await this.userRepository.findByEmail(email);
            if (existingEmail)
                throw new common_1.ConflictException('Email already registered');
        }
        if (username) {
            const existingUsername = await this.userRepository.findByUsername(username);
            if (existingUsername)
                throw new common_1.ConflictException('Username already exist');
        }
        let passwordHash;
        if (password) {
            passwordHash = await (0, password_hashing_1.hashPassword)(password);
        }
        const modifiedUserData = {
            ...otherData,
            ...(passwordHash && { passwordHash }),
            username,
            email,
        };
        const updatedUser = await this.userRepository.update(id, modifiedUserData);
        if (!updatedUser) {
            throw new common_1.InternalServerErrorException(`Failed to update user with ID ${id} unexpectedly.`);
        }
        return updatedUser;
    }
    async updateUserRole(id, updateUserRoleDto) {
        const user = await this.findById(id);
        if (user.student) {
            await this.studentsRepository.deleteStudent(id);
        }
        if (user.instructor) {
            await this.instructorRepository.deleteInstructor(id);
        }
        switch (updateUserRoleDto.role) {
            case client_1.UserRole.STUDENT:
                if (!updateUserRoleDto.program || !updateUserRoleDto.batchYear) {
                    throw new common_1.BadRequestException('Program and batchYear are required for a student role.');
                }
                await this.studentsRepository.createStudent(id, updateUserRoleDto.program, updateUserRoleDto.batchYear);
                break;
            case client_1.UserRole.INSTRUCTOR:
                if (!updateUserRoleDto.program) {
                    throw new common_1.BadRequestException('Program are required for a instructor role.');
                }
                await this.instructorRepository.createInstructor(id, updateUserRoleDto.program, updateUserRoleDto.userTitle);
                break;
            case client_1.UserRole.ADMIN:
            default:
        }
        const updatedUser = await this.userRepository.updateUserRole(id, updateUserRoleDto.role);
        return updatedUser;
    }
    async remove(id) {
        await this.findById(id);
        return this.userRepository.remove(id);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        students_repository_1.StudentsRepository,
        instructors_repository_1.InstructorRepository])
], UserService);
//# sourceMappingURL=user.service.js.map