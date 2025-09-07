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
exports.SubmissionResponseDto = exports.SubmissionFieldValueDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const module_response_dto_1 = require("../../../modules/dto/res/module-response.dto");
class SubmissionFieldValueDto {
    id;
    submitted;
    submissionId;
    submissionFieldId;
    createdAt;
    updatedAt;
    submissionField;
}
exports.SubmissionFieldValueDto = SubmissionFieldValueDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubmissionFieldValueDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmissionFieldValueDto.prototype, "submitted", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubmissionFieldValueDto.prototype, "submissionId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubmissionFieldValueDto.prototype, "submissionFieldId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SubmissionFieldValueDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SubmissionFieldValueDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => module_response_dto_1.SubmissionFieldDto),
    __metadata("design:type", module_response_dto_1.SubmissionFieldDto)
], SubmissionFieldValueDto.prototype, "submissionField", void 0);
class SubmissionResponseDto {
    id;
    studentId;
    enrollmentId;
    moduleId;
    submissionTemplateId;
    isLocked;
    isGraded;
    isPassed;
    scorePercentage;
    scoreAchieved;
    scoreTotal;
    feedback;
    createdAt;
    updatedAt;
    submissionTemplate;
    submissionFieldValue;
}
exports.SubmissionResponseDto = SubmissionResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubmissionResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubmissionResponseDto.prototype, "studentId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubmissionResponseDto.prototype, "enrollmentId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubmissionResponseDto.prototype, "moduleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubmissionResponseDto.prototype, "submissionTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SubmissionResponseDto.prototype, "isLocked", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SubmissionResponseDto.prototype, "isGraded", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SubmissionResponseDto.prototype, "isPassed", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", String)
], SubmissionResponseDto.prototype, "scorePercentage", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", String)
], SubmissionResponseDto.prototype, "scoreAchieved", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SubmissionResponseDto.prototype, "scoreTotal", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], SubmissionResponseDto.prototype, "feedback", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SubmissionResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SubmissionResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => module_response_dto_1.SubmissionTemplateDto),
    __metadata("design:type", Array)
], SubmissionResponseDto.prototype, "submissionTemplate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SubmissionFieldValueDto),
    __metadata("design:type", Array)
], SubmissionResponseDto.prototype, "submissionFieldValue", void 0);
//# sourceMappingURL=submission-response.dto.js.map