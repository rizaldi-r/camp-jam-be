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
exports.ModuleResponseDto = exports.ModuleSubdescriptionDto = exports.ModuleLinkDto = exports.SubmissionTemplateDto = exports.SubmissionFieldDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
class SubmissionFieldDto {
    id;
    label;
    isTextfield;
    submissionTemplateId;
    createdAt;
    updatedAt;
}
exports.SubmissionFieldDto = SubmissionFieldDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubmissionFieldDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmissionFieldDto.prototype, "label", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SubmissionFieldDto.prototype, "isTextfield", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubmissionFieldDto.prototype, "submissionTemplateId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SubmissionFieldDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SubmissionFieldDto.prototype, "updatedAt", void 0);
class SubmissionTemplateDto {
    id;
    moduleId;
    submissionTitle;
    endDate;
    scoreTotal;
    createdAt;
    updatedAt;
    submissionFields;
}
exports.SubmissionTemplateDto = SubmissionTemplateDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubmissionTemplateDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubmissionTemplateDto.prototype, "moduleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmissionTemplateDto.prototype, "submissionTitle", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Object)
], SubmissionTemplateDto.prototype, "endDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SubmissionTemplateDto.prototype, "scoreTotal", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SubmissionTemplateDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SubmissionTemplateDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SubmissionFieldDto),
    __metadata("design:type", Array)
], SubmissionTemplateDto.prototype, "submissionFields", void 0);
class ModuleLinkDto {
    id;
    label;
    href;
    moduleId;
    createdAt;
    updatedAt;
}
exports.ModuleLinkDto = ModuleLinkDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ModuleLinkDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ModuleLinkDto.prototype, "label", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ModuleLinkDto.prototype, "href", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ModuleLinkDto.prototype, "moduleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ModuleLinkDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ModuleLinkDto.prototype, "updatedAt", void 0);
class ModuleSubdescriptionDto {
    id;
    header;
    type;
    description;
    moduleId;
    createdAt;
    updatedAt;
}
exports.ModuleSubdescriptionDto = ModuleSubdescriptionDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ModuleSubdescriptionDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ModuleSubdescriptionDto.prototype, "header", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEnum)(client_1.DescriptionType),
    __metadata("design:type", String)
], ModuleSubdescriptionDto.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ModuleSubdescriptionDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ModuleSubdescriptionDto.prototype, "moduleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ModuleSubdescriptionDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ModuleSubdescriptionDto.prototype, "updatedAt", void 0);
class ModuleResponseDto {
    id;
    moduleType;
    embedVideoLink;
    title;
    description;
    sectionId;
    createdAt;
    updatedAt;
    links;
    subdescriptions;
    submissionTemplate;
}
exports.ModuleResponseDto = ModuleResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ModuleResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEnum)(client_1.ModuleType),
    __metadata("design:type", String)
], ModuleResponseDto.prototype, "moduleType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], ModuleResponseDto.prototype, "embedVideoLink", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ModuleResponseDto.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ModuleResponseDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ModuleResponseDto.prototype, "sectionId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ModuleResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ModuleResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ModuleLinkDto),
    __metadata("design:type", Array)
], ModuleResponseDto.prototype, "links", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ModuleSubdescriptionDto),
    __metadata("design:type", Array)
], ModuleResponseDto.prototype, "subdescriptions", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SubmissionTemplateDto),
    __metadata("design:type", Object)
], ModuleResponseDto.prototype, "submissionTemplate", void 0);
//# sourceMappingURL=module-response.dto.js.map