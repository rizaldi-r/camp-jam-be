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
exports.UpdateModuleDto = void 0;
const create_module_dto_1 = require("./create-module.dto");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
class UpdateModuleDto {
    title;
    moduleType;
    embedVideoLink;
    description;
    links;
    subdescriptions;
}
exports.UpdateModuleDto = UpdateModuleDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateModuleDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.ModuleType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModuleDto.prototype, "moduleType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModuleDto.prototype, "embedVideoLink", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModuleDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_module_dto_1.CreateLinkDto),
    __metadata("design:type", Array)
], UpdateModuleDto.prototype, "links", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_module_dto_1.CreateSubdescriptionDto),
    __metadata("design:type", Array)
], UpdateModuleDto.prototype, "subdescriptions", void 0);
//# sourceMappingURL=update-module.dto.js.map