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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionFieldsController = void 0;
const common_1 = require("@nestjs/common");
const create_submission_field_dto_1 = require("./dto/create-submission-field.dto");
const update_submission_field_dto_1 = require("./dto/update-submission-field.dto");
const submission_fields_service_1 = require("./submission-fields.service");
let SubmissionFieldsController = class SubmissionFieldsController {
    submissionFieldsService;
    constructor(submissionFieldsService) {
        this.submissionFieldsService = submissionFieldsService;
    }
    create(createSubmissionFieldDto) {
        return this.submissionFieldsService.create(createSubmissionFieldDto);
    }
    findAll(submissionTemplateId) {
        return this.submissionFieldsService.findAll(submissionTemplateId);
    }
    findOne(id) {
        return this.submissionFieldsService.findOne(id);
    }
    update(id, updateSubmissionFieldDto) {
        return this.submissionFieldsService.update(id, updateSubmissionFieldDto);
    }
    remove(id) {
        return this.submissionFieldsService.remove(id);
    }
};
exports.SubmissionFieldsController = SubmissionFieldsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_submission_field_dto_1.CreateSubmissionFieldDto]),
    __metadata("design:returntype", void 0)
], SubmissionFieldsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('submissionTemplateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubmissionFieldsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubmissionFieldsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_submission_field_dto_1.UpdateSubmissionFieldDto]),
    __metadata("design:returntype", void 0)
], SubmissionFieldsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubmissionFieldsController.prototype, "remove", null);
exports.SubmissionFieldsController = SubmissionFieldsController = __decorate([
    (0, common_1.Controller)('submission-fields'),
    __metadata("design:paramtypes", [submission_fields_service_1.SubmissionFieldsService])
], SubmissionFieldsController);
//# sourceMappingURL=submission-fields.controller.js.map