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
exports.ModuleProgressRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ModuleProgressRepository = class ModuleProgressRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStudentOwnerId(id) {
        const progress = await this.prisma.moduleProgress.findUnique({
            where: { id },
            select: {
                enrollment: {
                    select: {
                        studentId: true,
                    },
                },
            },
        });
        return progress?.enrollment?.studentId ?? null;
    }
    async getInstructorOwnerId(id) {
        const progress = await this.prisma.moduleProgress.findUnique({
            where: { id },
            select: {
                enrollment: {
                    select: {
                        instructorId: true,
                    },
                },
            },
        });
        return progress?.enrollment?.instructorId ?? null;
    }
    async create(data) {
        return this.prisma.moduleProgress.create({
            data,
        });
    }
    async findById(id) {
        return this.prisma.moduleProgress.findUnique({
            where: { id },
        });
    }
    async findByEnrollmentAndModule(enrollmentId, moduleId) {
        return this.prisma.moduleProgress.findUnique({
            where: {
                enrollmentId_moduleId: {
                    enrollmentId,
                    moduleId,
                },
            },
        });
    }
    async findByEnrollmentId(enrollmentId) {
        return this.prisma.moduleProgress.findMany({
            where: {
                enrollmentId,
            },
        });
    }
    async findByModuleId(moduleId) {
        return this.prisma.moduleProgress.findMany({
            where: {
                moduleId,
            },
        });
    }
    async findAll() {
        return this.prisma.moduleProgress.findMany();
    }
    async update(id, data) {
        return this.prisma.moduleProgress.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return this.prisma.moduleProgress.delete({ where: { id } });
    }
    async updateAndRecalculateProgress(id, data, moduleType, isMarkingComplete, enrollmentModuleProgressId, enrollmentLectureProgressId, enrollmentAssignmentProgressId) {
        const operation = isMarkingComplete ? 'increment' : 'decrement';
        return this.prisma.$transaction(async (prisma) => {
            const updatedModuleProgress = await prisma.moduleProgress.update({
                where: { id },
                data,
            });
            const updatedEnrollmentModuleProgress = await prisma.enrollmentData.update({
                where: { id: enrollmentModuleProgressId },
                data: {
                    moduleCompleted: {
                        [operation]: 1,
                    },
                },
            });
            let updatedModuleTypeProgress;
            let targetEnrollmentId;
            if (moduleType === 'LECTURE') {
                targetEnrollmentId = enrollmentLectureProgressId;
            }
            else if (moduleType === 'ASSIGNMENT') {
                targetEnrollmentId = enrollmentAssignmentProgressId;
            }
            if (targetEnrollmentId) {
                updatedModuleTypeProgress = await prisma.enrollmentData.update({
                    where: { id: targetEnrollmentId },
                    data: {
                        moduleCompleted: {
                            [operation]: 1,
                        },
                    },
                });
                await prisma.enrollmentData.update({
                    where: { id: targetEnrollmentId },
                    data: {
                        progressPercentage: (Number(updatedModuleTypeProgress.moduleCompleted) /
                            Number(updatedModuleTypeProgress.moduleTotal)) *
                            100,
                    },
                });
            }
            await prisma.enrollmentData.update({
                where: { id: enrollmentModuleProgressId },
                data: {
                    progressPercentage: (Number(updatedEnrollmentModuleProgress.moduleCompleted) /
                        Number(updatedEnrollmentModuleProgress.moduleTotal)) *
                        100,
                },
            });
            return updatedModuleProgress;
        });
    }
};
exports.ModuleProgressRepository = ModuleProgressRepository;
exports.ModuleProgressRepository = ModuleProgressRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ModuleProgressRepository);
//# sourceMappingURL=module-progress.repository.js.map