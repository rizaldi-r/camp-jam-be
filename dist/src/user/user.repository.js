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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserRepository = class UserRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(filters) {
        const { username, firstName, lastName, email, role } = filters || {};
        return this.prisma.user.findMany({
            where: {
                AND: [
                    username
                        ? { username: { contains: username, mode: 'insensitive' } }
                        : {},
                    firstName
                        ? { firstName: { contains: firstName, mode: 'insensitive' } }
                        : {},
                    lastName
                        ? { lastName: { contains: lastName, mode: 'insensitive' } }
                        : {},
                    email ? { email: { contains: email, mode: 'insensitive' } } : {},
                    role ? { role } : {},
                ],
            },
            include: {
                student: true,
                instructor: true,
            },
        });
    }
    async findById(id) {
        const foundUser = await this.prisma.user.findUnique({
            where: { id },
            include: {
                student: true,
                instructor: true,
            },
        });
        return foundUser;
    }
    async findByUsername(username) {
        const foundUser = await this.prisma.user.findUnique({
            where: { username },
            include: {
                student: true,
                instructor: true,
            },
        });
        return foundUser;
    }
    async findByEmail(email) {
        const foundUser = await this.prisma.user.findUnique({
            where: { email },
            include: {
                student: true,
                instructor: true,
            },
        });
        return foundUser;
    }
    async create(createData) {
        return await this.prisma.user.create({
            data: createData,
        });
    }
    async update(id, userInput) {
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
                ...userInput,
            },
        });
        return updatedUser;
    }
    async updateUserRole(id, role) {
        return this.prisma.user.update({
            where: { id },
            data: {
                role,
            },
            include: {
                student: true,
                instructor: true,
            },
        });
    }
    async remove(id) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRepository);
//# sourceMappingURL=user.repository.js.map