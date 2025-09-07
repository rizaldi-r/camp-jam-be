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
exports.GradeSubmissionDto = exports.LockSubmissionDto = exports.UpdateSubmissionDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_submission_dto_1 = require("./create-submission.dto");
class UpdateSubmissionDto {
    submissionFieldValueData;
}
exports.UpdateSubmissionDto = UpdateSubmissionDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_submission_dto_1.SubmissionFieldValueDto),
    __metadata("design:type", Array)
], UpdateSubmissionDto.prototype, "submissionFieldValueData", void 0);
class LockSubmissionDto {
    isLocked;
}
exports.LockSubmissionDto = LockSubmissionDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], LockSubmissionDto.prototype, "isLocked", void 0);
class GradeSubmissionDto {
    isPassed;
    scoreAchieved;
    feedback;
}
exports.GradeSubmissionDto = GradeSubmissionDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], GradeSubmissionDto.prototype, "isPassed", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDecimal)(),
    __metadata("design:type", Number)
], GradeSubmissionDto.prototype, "scoreAchieved", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GradeSubmissionDto.prototype, "feedback", void 0);
//# sourceMappingURL=update-submission.dto.js.map