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
exports.SubmissionFieldsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SubmissionFieldsService = class SubmissionFieldsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.submissionField.create({
            data,
        });
    }
    async findAll(submissionTemplateId) {
        const where = submissionTemplateId ? { submissionTemplateId } : undefined;
        return this.prisma.submissionField.findMany({
            where,
        });
    }
    async findOne(id) {
        const submissionField = await this.prisma.submissionField.findUnique({
            where: { id },
        });
        if (!submissionField) {
            throw new common_1.NotFoundException(`SubmissionField with ID "${id}" not found`);
        }
        return submissionField;
    }
    async update(id, data) {
        await this.findOne(id);
        return await this.prisma.submissionField.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return await this.prisma.submissionField.delete({
            where: { id },
        });
    }
};
exports.SubmissionFieldsService = SubmissionFieldsService;
exports.SubmissionFieldsService = SubmissionFieldsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubmissionFieldsService);
//# sourceMappingURL=submission-fields.service.js.map