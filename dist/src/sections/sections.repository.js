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
exports.SectionsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SectionsRepository = class SectionsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.section.create({ data });
    }
    async findAll() {
        return this.prisma.section.findMany();
    }
    async findAllByCourseId(courseId) {
        return this.prisma.section.findMany({
            where: { courseId },
            include: {
                modules: true,
            },
        });
    }
    async findById(id) {
        return this.prisma.section.findUnique({
            where: { id },
            include: {
                modules: true,
            },
        });
    }
    async getOwnerId(sectionId) {
        const sectionWithCourse = await this.prisma.section.findUnique({
            where: { id: sectionId },
            select: {
                course: {
                    select: {
                        instructorId: true,
                    },
                },
            },
        });
        return sectionWithCourse?.course?.instructorId || null;
    }
    async update(id, data) {
        return this.prisma.section.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        return this.prisma.section.delete({
            where: { id },
        });
    }
};
exports.SectionsRepository = SectionsRepository;
exports.SectionsRepository = SectionsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SectionsRepository);
//# sourceMappingURL=sections.repository.js.map