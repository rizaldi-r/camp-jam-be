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
exports.SubmissionsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SubmissionsRepository = class SubmissionsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStudentId(id) {
        const submission = await this.prisma.submission.findUnique({
            where: { id },
            select: {
                studentId: true,
            },
        });
        return submission?.studentId ?? null;
    }
    async getInstructorId(id) {
        const submission = await this.prisma.submission.findUnique({
            where: { id },
            select: {
                enrollment: {
                    select: {
                        instructorId: true,
                    },
                },
            },
        });
        return submission?.enrollment?.instructorId ?? null;
    }
    async create(data) {
        const { submissionFieldValueData, ...submissionData } = data;
        return this.prisma.submission.create({
            data: {
                ...submissionData,
                submissionFieldValue: {
                    create: submissionFieldValueData,
                },
            },
            include: {
                submissionFieldValue: { include: { submissionField: true } },
            },
        });
    }
    async findById(id) {
        return this.prisma.submission.findUnique({
            where: { id },
            include: {
                submissionFieldValue: { include: { submissionField: true } },
            },
        });
    }
    async findAll() {
        return this.prisma.submission.findMany({
            include: {
                submissionFieldValue: { include: { submissionField: true } },
            },
        });
    }
    async findByEnrollmentId(enrollmentId) {
        return this.prisma.submission.findMany({
            where: {
                enrollmentId,
            },
            include: {
                submissionFieldValue: { include: { submissionField: true } },
            },
        });
    }
    async update(id, data) {
        const updateData = {};
        if ('submissionFieldValueData' in data && data.submissionFieldValueData) {
            await this.prisma.submissionFieldValue.deleteMany({
                where: { submissionId: id },
            });
            updateData.submissionFieldValue = {
                create: data.submissionFieldValueData,
            };
        }
        if ('isGraded' in data) {
            updateData.isGraded = data.isGraded;
            updateData.isPassed = data.isPassed;
            updateData.scorePercentage = data.scorePercentage;
            updateData.scoreAchieved = data.scoreAchieved;
            updateData.feedback = data.feedback;
        }
        if ('isLocked' in data) {
            updateData.isLocked = data.isLocked;
        }
        return this.prisma.submission.update({
            where: { id },
            data: updateData,
            include: {
                submissionFieldValue: { include: { submissionField: true } },
            },
        });
    }
    async lockAllByModuleId(moduleId, isLocked) {
        await this.prisma.submission.updateMany({
            where: {
                moduleId,
            },
            data: {
                isLocked,
            },
        });
    }
    async lockAllByTemplateId(templateId, isLocked) {
        await this.prisma.submission.updateMany({
            where: { submissionTemplateId: templateId },
            data: { isLocked },
        });
    }
    async delete(id) {
        return this.prisma.submission.delete({ where: { id } });
    }
    async findFieldValuesBySubmissionId(submissionId) {
        return this.prisma.submissionFieldValue.findMany({
            where: { submissionId },
        });
    }
};
exports.SubmissionsRepository = SubmissionsRepository;
exports.SubmissionsRepository = SubmissionsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubmissionsRepository);
//# sourceMappingURL=submissions.repository.js.map