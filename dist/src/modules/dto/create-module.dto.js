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
exports.CreateModuleDto = exports.CreateSubdescriptionDto = exports.CreateLinkDto = void 0;
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_submission_template_dto_1 = require("../../submission-templates/dto/create-submission-template.dto");
class CreateLinkDto {
    label;
    href;
}
exports.CreateLinkDto = CreateLinkDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLinkDto.prototype, "label", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLinkDto.prototype, "href", void 0);
class CreateSubdescriptionDto {
    header;
    type;
    description;
}
exports.CreateSubdescriptionDto = CreateSubdescriptionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSubdescriptionDto.prototype, "header", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.DescriptionType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSubdescriptionDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSubdescriptionDto.prototype, "description", void 0);
class CreateSubmissionTemplateDto {
    submissionTitle;
    submissionFields;
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSubmissionTemplateDto.prototype, "submissionTitle", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_submission_template_dto_1.CreateSubmissionFieldDto),
    __metadata("design:type", Array)
], CreateSubmissionTemplateDto.prototype, "submissionFields", void 0);
class CreateModuleDto {
    title;
    moduleType;
    embedVideoLink;
    description;
    sectionId;
    subdescriptions;
    links;
    submissionTemplate;
}
exports.CreateModuleDto = CreateModuleDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateModuleDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.ModuleType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateModuleDto.prototype, "moduleType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModuleDto.prototype, "embedVideoLink", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModuleDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateModuleDto.prototype, "sectionId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateSubdescriptionDto),
    __metadata("design:type", Array)
], CreateModuleDto.prototype, "subdescriptions", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateLinkDto),
    __metadata("design:type", Array)
], CreateModuleDto.prototype, "links", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateSubmissionTemplateDto),
    __metadata("design:type", CreateSubmissionTemplateDto)
], CreateModuleDto.prototype, "submissionTemplate", void 0);
//# sourceMappingURL=create-module.dto.js.map