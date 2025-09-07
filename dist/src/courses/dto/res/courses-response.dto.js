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
exports.CourseResponseDto = void 0;
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const instructors_response_body_dto_1 = require("../../../instructors/dto/res/instructors-response-body.dto");
const sections_response_dto_1 = require("../../../sections/dto/res/sections-response.dto");
class CourseResponseDto {
    id;
    title;
    imageSrc;
    imageAlt;
    description;
    startDate;
    endDate;
    isMemberOnly;
    isLocked;
    instructorId;
    allowedPrograms;
    allowedBatchYears;
    instructor;
    sections;
    categories;
}
exports.CourseResponseDto = CourseResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CourseResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CourseResponseDto.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CourseResponseDto.prototype, "imageSrc", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CourseResponseDto.prototype, "imageAlt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CourseResponseDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Object)
], CourseResponseDto.prototype, "startDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Object)
], CourseResponseDto.prototype, "endDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CourseResponseDto.prototype, "isMemberOnly", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CourseResponseDto.prototype, "isLocked", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CourseResponseDto.prototype, "instructorId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(client_1.Program, { each: true }),
    __metadata("design:type", Array)
], CourseResponseDto.prototype, "allowedPrograms", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    __metadata("design:type", Array)
], CourseResponseDto.prototype, "allowedBatchYears", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => instructors_response_body_dto_1.InstructorResponseDto),
    __metadata("design:type", instructors_response_body_dto_1.InstructorResponseDto)
], CourseResponseDto.prototype, "instructor", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => sections_response_dto_1.SectionResponseDto),
    __metadata("design:type", Array)
], CourseResponseDto.prototype, "sections", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], CourseResponseDto.prototype, "categories", void 0);
//# sourceMappingURL=courses-response.dto.js.map