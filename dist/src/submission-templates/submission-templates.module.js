"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionTemplatesModule = void 0;
const common_1 = require("@nestjs/common");
const submission_template_repository_1 = require("./submission-template.repository");
const submission_templates_controller_1 = require("./submission-templates.controller");
const submission_templates_service_1 = require("./submission-templates.service");
let SubmissionTemplatesModule = class SubmissionTemplatesModule {
};
exports.SubmissionTemplatesModule = SubmissionTemplatesModule;
exports.SubmissionTemplatesModule = SubmissionTemplatesModule = __decorate([
    (0, common_1.Module)({
        controllers: [submission_templates_controller_1.SubmissionTemplatesController],
        providers: [submission_templates_service_1.SubmissionTemplatesService, submission_template_repository_1.SubmissionTemplatesRepository],
        exports: [submission_templates_service_1.SubmissionTemplatesService, submission_template_repository_1.SubmissionTemplatesRepository],
    })
], SubmissionTemplatesModule);
//# sourceMappingURL=submission-templates.module.js.map