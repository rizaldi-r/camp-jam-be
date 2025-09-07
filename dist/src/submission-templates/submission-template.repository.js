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
exports.SubmissionTemplatesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SubmissionTemplatesRepository = class SubmissionTemplatesRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOwnerId(id) {
        const template = await this.prisma.submissionTemplate.findUnique({
            where: { id },
            select: {
                module: {
                    select: {
                        section: {
                            select: {
                                course: {
                                    select: {
                                        instructorId: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        return template?.module?.section?.course?.instructorId ?? null;
    }
    async create(data) {
        const { submissionFields, ...templateData } = data;
        return this.prisma.submissionTemplate.create({
            data: {
                ...templateData,
                submissionFields: {
                    create: submissionFields,
                },
            },
            include: {
                submissionFields: true,
            },
        });
    }
    async findById(id) {
        return this.prisma.submissionTemplate.findUnique({
            where: { id },
            include: {
                submissionFields: true,
            },
        });
    }
    async findByModuleId(moduleId) {
        return this.prisma.submissionTemplate.findUnique({
            where: { moduleId },
            include: {
                submissionFields: true,
            },
        });
    }
    async findByCourseId(courseId) {
        return this.prisma.submissionTemplate.findMany({
            where: {
                module: {
                    section: {
                        courseId: courseId,
                    },
                },
            },
            include: {
                submissionFields: true,
            },
        });
    }
    async findAll() {
        return this.prisma.submissionTemplate.findMany({
            include: {
                submissionFields: true,
            },
        });
    }
    async findFieldsByTemplateId(templateId) {
        return this.prisma.submissionField.findMany({
            where: { submissionTemplateId: templateId },
            include: {
                submissionTemplate: true,
            },
        });
    }
    async update(id, data) {
        const updateData = {};
        if (data.submissionTitle) {
            updateData.submissionTitle = data.submissionTitle;
        }
        if (data.submissionFields) {
            await this.prisma.submissionField.deleteMany({
                where: { submissionTemplateId: id },
            });
            updateData.submissionFields = {
                create: data.submissionFields,
            };
        }
        return this.prisma.submissionTemplate.update({
            where: { id },
            data: updateData,
            include: {
                submissionFields: true,
            },
        });
    }
    async delete(id) {
        return this.prisma.submissionTemplate.delete({ where: { id } });
    }
};
exports.SubmissionTemplatesRepository = SubmissionTemplatesRepository;
exports.SubmissionTemplatesRepository = SubmissionTemplatesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubmissionTemplatesRepository);
//# sourceMappingURL=submission-template.repository.js.map