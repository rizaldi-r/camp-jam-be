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
exports.SubdescriptionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const modules_service_1 = require("../modules/modules.service");
let SubdescriptionsService = class SubdescriptionsService {
    prisma;
    modulesService;
    constructor(prisma, modulesService) {
        this.prisma = prisma;
        this.modulesService = modulesService;
    }
    async create(data) {
        await this.modulesService.findById(data.moduleId);
        return this.prisma.subdescription.create({
            data,
        });
    }
    async findAll(moduleId) {
        return this.prisma.subdescription.findMany({
            where: moduleId ? { moduleId } : undefined,
        });
    }
    async findOne(id) {
        const subdescription = await this.prisma.subdescription.findUnique({
            where: { id },
        });
        if (!subdescription) {
            throw new common_1.NotFoundException(`Subdescription with ID "${id}" not found`);
        }
        return subdescription;
    }
    async update(id, data) {
        return this.prisma.subdescription.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        return this.prisma.subdescription.delete({
            where: { id },
        });
    }
};
exports.SubdescriptionsService = SubdescriptionsService;
exports.SubdescriptionsService = SubdescriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        modules_service_1.ModulesService])
], SubdescriptionsService);
//# sourceMappingURL=subdescriptions.service.js.map