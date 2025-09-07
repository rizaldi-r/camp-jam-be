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
exports.CategoriesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoriesRepository = class CategoriesRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.category.create({ data });
    }
    async findAll(query) {
        const { name, program } = query;
        const where = {};
        if (name) {
            where.name = { contains: name, mode: 'insensitive' };
        }
        if (program) {
            where.programs = { has: program };
        }
        return this.prisma.category.findMany({ where });
    }
    async findById(id) {
        return this.prisma.category.findUnique({
            where: { id },
        });
    }
    async findByIdList(ids) {
        return this.prisma.category.findMany({
            where: { id: { in: ids } },
        });
    }
    async update(id, data) {
        return this.prisma.category.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        return this.prisma.category.delete({
            where: { id },
        });
    }
};
exports.CategoriesRepository = CategoriesRepository;
exports.CategoriesRepository = CategoriesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesRepository);
//# sourceMappingURL=cateogories.repository.js.map