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
exports.LinksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const custom_not_found_exception_1 = require("../_common/exceptions/custom-not-found.exception");
const modules_service_1 = require("../modules/modules.service");
let LinksService = class LinksService {
    prisma;
    modulesService;
    constructor(prisma, modulesService) {
        this.prisma = prisma;
        this.modulesService = modulesService;
    }
    async create(createLinkDto) {
        await this.modulesService.findById(createLinkDto.moduleId);
        return this.prisma.link.create({
            data: createLinkDto,
        });
    }
    async findAll(moduleId) {
        const where = moduleId ? { moduleId } : {};
        return this.prisma.link.findMany({
            where,
        });
    }
    async findOne(id) {
        const link = await this.prisma.link.findUnique({
            where: { id },
        });
        if (!link) {
            throw new custom_not_found_exception_1.ResourceNotFoundException('Instructor', 'id', id);
        }
        return link;
    }
    async update(id, updateLinkDto) {
        return this.prisma.link.update({
            where: { id },
            data: updateLinkDto,
        });
    }
    async remove(id) {
        return this.prisma.link.delete({
            where: { id },
        });
    }
};
exports.LinksService = LinksService;
exports.LinksService = LinksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        modules_service_1.ModulesService])
], LinksService);
//# sourceMappingURL=links.service.js.map