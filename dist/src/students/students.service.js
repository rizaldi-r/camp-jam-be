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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const custom_not_found_exception_1 = require("../_common/exceptions/custom-not-found.exception");
const students_repository_1 = require("./students.repository");
let StudentsService = class StudentsService {
    studentRepository;
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    async findStudentByUserId(userId) {
        const student = await this.studentRepository.findStudentByUserId(userId);
        if (!student) {
            throw new custom_not_found_exception_1.ResourceNotFoundException('Student', 'user id', userId);
        }
        return student;
    }
    async updateBatchYear(userId, updateDto) {
        await this.findStudentByUserId(userId);
        return this.studentRepository.updateBatchYearByUserId(userId, updateDto.batchYear);
    }
    async updateMembershipStatus(userId, updateDto) {
        await this.findStudentByUserId(userId);
        return this.studentRepository.updateMembershipStatusByUserId(userId, updateDto.membershipStatus);
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [students_repository_1.StudentsRepository])
], StudentsService);
//# sourceMappingURL=students.service.js.map