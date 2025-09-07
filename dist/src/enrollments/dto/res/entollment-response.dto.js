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
exports.EnrollmentResponseDto = exports.ProgressResponseDto = void 0;
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const courses_response_dto_1 = require("../../../courses/dto/res/courses-response.dto");
const instructors_response_body_dto_1 = require("../../../instructors/dto/res/instructors-response-body.dto");
const module_progress_response_dto_1 = require("../../../module-progress/dto/res/module-progress-response.dto");
const student_response_dto_1 = require("../../../students/dto/res/student-response.dto");
const submission_response_dto_1 = require("../../../submissions/dto/res/submission-response.dto");
class ProgressResponseDto {
    id;
    progressPercentage;
    moduleCompleted;
    moduleTotal;
    createdAt;
    updatedAt;
    moduleProgressId;
    lectureProgressId;
    assignmentProgressId;
    assignmentScoreId;
}
exports.ProgressResponseDto = ProgressResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ProgressResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ProgressResponseDto.prototype, "progressPercentage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProgressResponseDto.prototype, "moduleCompleted", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProgressResponseDto.prototype, "moduleTotal", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ProgressResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ProgressResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ProgressResponseDto.prototype, "moduleProgressId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ProgressResponseDto.prototype, "lectureProgressId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ProgressResponseDto.prototype, "assignmentProgressId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ProgressResponseDto.prototype, "assignmentScoreId", void 0);
class EnrollmentResponseDto {
    id;
    studentId;
    instructorId;
    courseId;
    status;
    createdAt;
    updatedAt;
    instructor;
    student;
    moduleProgress;
    lectureProgress;
    assignmentProgress;
    assignmentScore;
    moduleProgresses;
    course;
    submissions;
}
exports.EnrollmentResponseDto = EnrollmentResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], EnrollmentResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], EnrollmentResponseDto.prototype, "studentId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], EnrollmentResponseDto.prototype, "instructorId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], EnrollmentResponseDto.prototype, "courseId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEnum)(client_1.CourseStatus),
    __metadata("design:type", String)
], EnrollmentResponseDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], EnrollmentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], EnrollmentResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => instructors_response_body_dto_1.InstructorResponseDto),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", instructors_response_body_dto_1.InstructorResponseDto)
], EnrollmentResponseDto.prototype, "instructor", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => student_response_dto_1.StudentResponseDto),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", student_response_dto_1.StudentResponseDto)
], EnrollmentResponseDto.prototype, "student", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => ProgressResponseDto),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", ProgressResponseDto)
], EnrollmentResponseDto.prototype, "moduleProgress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => ProgressResponseDto),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", ProgressResponseDto)
], EnrollmentResponseDto.prototype, "lectureProgress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => ProgressResponseDto),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", ProgressResponseDto)
], EnrollmentResponseDto.prototype, "assignmentProgress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => ProgressResponseDto),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", ProgressResponseDto)
], EnrollmentResponseDto.prototype, "assignmentScore", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => module_progress_response_dto_1.ModuleProgressDto),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", module_progress_response_dto_1.ModuleProgressDto)
], EnrollmentResponseDto.prototype, "moduleProgresses", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => courses_response_dto_1.CourseResponseDto),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", courses_response_dto_1.CourseResponseDto)
], EnrollmentResponseDto.prototype, "course", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => submission_response_dto_1.SubmissionResponseDto),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", submission_response_dto_1.SubmissionResponseDto)
], EnrollmentResponseDto.prototype, "submissions", void 0);
//# sourceMappingURL=entollment-response.dto.js.map