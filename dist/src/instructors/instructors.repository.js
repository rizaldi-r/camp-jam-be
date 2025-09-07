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
exports.InstructorRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let InstructorRepository = class InstructorRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findInstructorById(id) {
        return this.prisma.instructor.findUnique({
            where: { id },
        });
    }
    async findInstructorByUserId(userId) {
        return this.prisma.instructor.findUnique({
            where: { userId },
        });
    }
    async updateInstructorDetailsByUserId(userId, updateData) {
        return this.prisma.instructor.update({
            where: { userId },
            data: updateData,
        });
    }
    async createInstructor(userId, program, userTitle) {
        return this.prisma.instructor.create({
            data: {
                userId,
                userTitle,
                program,
            },
        });
    }
    async deleteInstructor(userId) {
        return this.prisma.instructor.delete({
            where: { userId },
        });
    }
};
exports.InstructorRepository = InstructorRepository;
exports.InstructorRepository = InstructorRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InstructorRepository);
//# sourceMappingURL=instructors.repository.js.map