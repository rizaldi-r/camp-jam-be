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
exports.FindAllEnrollmentQueryDto = exports.SortOptionDto = exports.SearchDataDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const find_course_query_dto_1 = require("../../courses/dto/find-course-query.dto");
const enrollments_repository_interface_1 = require("../types/enrollments.repository.interface");
class SearchDataDto {
    searchQuery;
    searchBy;
}
exports.SearchDataDto = SearchDataDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SearchDataDto.prototype, "searchQuery", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enrollments_repository_interface_1.SearchBy),
    __metadata("design:type", String)
], SearchDataDto.prototype, "searchBy", void 0);
class SortOptionDto {
    sortBy;
    sortOrder;
}
exports.SortOptionDto = SortOptionDto;
__decorate([
    (0, class_validator_1.IsEnum)(find_course_query_dto_1.SortBy),
    __metadata("design:type", String)
], SortOptionDto.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(find_course_query_dto_1.SortOrder),
    __metadata("design:type", String)
], SortOptionDto.prototype, "sortOrder", void 0);
class FindAllEnrollmentQueryDto {
    includeSubmissions;
    includeAllProgress;
    includeCourse;
    includeSections;
    includeModuleProgresses;
    courseId;
    courseCategoryId;
    searchQuery;
    searchBy;
    sortBy;
    sortOrder;
}
exports.FindAllEnrollmentQueryDto = FindAllEnrollmentQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true'),
    __metadata("design:type", Boolean)
], FindAllEnrollmentQueryDto.prototype, "includeSubmissions", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true'),
    __metadata("design:type", Boolean)
], FindAllEnrollmentQueryDto.prototype, "includeAllProgress", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true'),
    __metadata("design:type", Boolean)
], FindAllEnrollmentQueryDto.prototype, "includeCourse", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true'),
    __metadata("design:type", Boolean)
], FindAllEnrollmentQueryDto.prototype, "includeSections", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true'),
    __metadata("design:type", Boolean)
], FindAllEnrollmentQueryDto.prototype, "includeModuleProgresses", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindAllEnrollmentQueryDto.prototype, "courseId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindAllEnrollmentQueryDto.prototype, "courseCategoryId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindAllEnrollmentQueryDto.prototype, "searchQuery", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enrollments_repository_interface_1.SearchBy),
    __metadata("design:type", String)
], FindAllEnrollmentQueryDto.prototype, "searchBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(find_course_query_dto_1.SortBy),
    __metadata("design:type", String)
], FindAllEnrollmentQueryDto.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(find_course_query_dto_1.SortOrder),
    __metadata("design:type", String)
], FindAllEnrollmentQueryDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=find-enrollment.dto.js.map