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
exports.StudentsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let StudentsRepository = class StudentsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findStudentByUserId(userId) {
        return this.prisma.student.findUnique({
            where: { userId },
        });
    }
    async createStudent(userId, program, batchYear) {
        return this.prisma.student.create({
            data: {
                userId,
                program,
                batchYear,
            },
        });
    }
    async deleteStudent(userId) {
        return this.prisma.student.delete({
            where: { userId },
        });
    }
    async updateBatchYearByUserId(userId, batchYear) {
        return this.prisma.student.update({
            where: { userId },
            data: { batchYear },
        });
    }
    async updateMembershipStatusByUserId(userId, membershipStatus) {
        return this.prisma.student.update({
            where: { userId },
            data: { membershipStatus },
        });
    }
};
exports.StudentsRepository = StudentsRepository;
exports.StudentsRepository = StudentsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudentsRepository);
//# sourceMappingURL=students.repository.js.map