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
exports.ModulesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ModulesRepository = class ModulesRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findCourseByModuleId(moduleId) {
        const module = await this.prisma.module.findUnique({
            where: { id: moduleId },
            select: {
                section: {
                    select: {
                        course: true,
                    },
                },
            },
        });
        return module?.section?.course || null;
    }
    async create(createData) {
        const { subdescriptions, links, ...moduleData } = createData;
        return this.prisma.module.create({
            data: {
                ...moduleData,
                subdescriptions: {
                    create: subdescriptions,
                },
                links: {
                    create: links,
                },
            },
        });
    }
    async findByCourseId(courseId) {
        return this.prisma.module.findMany({
            where: {
                section: {
                    courseId: courseId,
                },
            },
            include: {
                links: true,
                subdescriptions: true,
                submissionTemplate: {
                    include: {
                        submissionFields: true,
                    },
                },
            },
        });
    }
    async findBySectionId(sectionId) {
        return this.prisma.module.findMany({
            where: { sectionId },
            include: {
                links: true,
                subdescriptions: true,
                submissionTemplate: {
                    include: {
                        submissionFields: true,
                    },
                },
            },
        });
    }
    async findAll(sectionId) {
        return this.prisma.module.findMany({
            where: sectionId ? { sectionId } : {},
            include: {
                links: true,
                subdescriptions: true,
                submissionTemplate: {
                    include: {
                        submissionFields: true,
                    },
                },
            },
        });
    }
    async findById(id) {
        return this.prisma.module.findUnique({
            where: { id },
            include: {
                links: true,
                subdescriptions: true,
                submissionTemplate: {
                    include: {
                        submissionFields: true,
                    },
                },
            },
        });
    }
    async findInstructorIdByModuleId(moduleId) {
        const module = await this.prisma.module.findUnique({
            where: { id: moduleId },
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
        });
        return module?.section?.course?.instructorId || null;
    }
    async update(id, updateData) {
        const { links, subdescriptions, ...moduleData } = updateData;
        return this.prisma.$transaction(async (prisma) => {
            if (links) {
                await prisma.link.deleteMany({
                    where: { moduleId: id },
                });
                await prisma.link.createMany({
                    data: links.map((link) => ({ ...link, moduleId: id })),
                });
            }
            if (subdescriptions) {
                await prisma.subdescription.deleteMany({
                    where: { moduleId: id },
                });
                await prisma.subdescription.createMany({
                    data: subdescriptions.map((sub) => ({ ...sub, moduleId: id })),
                });
            }
            return prisma.module.update({
                where: { id },
                data: moduleData,
            });
        });
    }
    async remove(id) {
        return this.prisma.module.delete({
            where: { id },
        });
    }
};
exports.ModulesRepository = ModulesRepository;
exports.ModulesRepository = ModulesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ModulesRepository);
//# sourceMappingURL=modules.repository.js.map