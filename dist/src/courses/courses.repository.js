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
exports.CoursesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CoursesRepository = class CoursesRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    buildWhereClause(query) {
        const { title, program, categoryId, categoryName, instructorId, instructorName, instructorUsername, studentId, studentName, studentUsername, } = query;
        const where = {};
        if (title) {
            where.title = {
                contains: title,
                mode: 'insensitive',
            };
        }
        if (program) {
            where.allowedPrograms = {
                hasSome: [program],
            };
        }
        this.applyCategoryFilter(where, categoryId, categoryName);
        this.applyInstructorFilter(where, instructorId, instructorName, instructorUsername);
        this.applyStudentFilter(where, studentId, studentName, studentUsername);
        return where;
    }
    applyCategoryFilter(where, categoryId, categoryName) {
        if (categoryId) {
            where.categories = {
                some: {
                    categoryId,
                },
            };
        }
        else if (categoryName) {
            where.categories = {
                some: {
                    category: {
                        name: {
                            contains: categoryName,
                            mode: 'insensitive',
                        },
                    },
                },
            };
        }
    }
    applyInstructorFilter(where, instructorId, instructorName, instructorUsername) {
        if (instructorId) {
            where.instructorId = instructorId;
        }
        else if (instructorUsername) {
            where.instructor = {
                user: {
                    username: {
                        contains: instructorUsername,
                        mode: 'insensitive',
                    },
                },
            };
        }
        else if (instructorName) {
            where.instructor = {
                user: {
                    OR: [
                        {
                            firstName: {
                                contains: instructorName,
                                mode: 'insensitive',
                            },
                        },
                        {
                            lastName: {
                                contains: instructorName,
                                mode: 'insensitive',
                            },
                        },
                        {
                            AND: instructorName.split(' ').map((term) => ({
                                OR: [
                                    {
                                        firstName: {
                                            contains: term.trim(),
                                            mode: 'insensitive',
                                        },
                                    },
                                    {
                                        lastName: {
                                            contains: term.trim(),
                                            mode: 'insensitive',
                                        },
                                    },
                                ],
                            })),
                        },
                    ],
                },
            };
        }
    }
    applyStudentFilter(where, studentId, studentName, studentUsername) {
        if (studentId) {
            where.enrollments = {
                some: {
                    studentId,
                },
            };
        }
        else if (studentUsername) {
            where.enrollments = {
                some: {
                    student: {
                        user: {
                            username: {
                                contains: studentUsername,
                                mode: 'insensitive',
                            },
                        },
                    },
                },
            };
        }
        else if (studentName) {
            where.enrollments = {
                some: {
                    student: {
                        user: {
                            OR: [
                                {
                                    firstName: {
                                        contains: studentName,
                                        mode: 'insensitive',
                                    },
                                },
                                {
                                    lastName: {
                                        contains: studentName,
                                        mode: 'insensitive',
                                    },
                                },
                                {
                                    AND: studentName.split(' ').map((term) => ({
                                        OR: [
                                            {
                                                firstName: {
                                                    contains: term.trim(),
                                                    mode: 'insensitive',
                                                },
                                            },
                                            {
                                                lastName: {
                                                    contains: term.trim(),
                                                    mode: 'insensitive',
                                                },
                                            },
                                        ],
                                    })),
                                },
                            ],
                        },
                    },
                },
            };
        }
    }
    buildOrderByClause(sortBy, sortOrder = 'desc') {
        const orderBy = [];
        switch (sortBy) {
            case 'createdAt':
                orderBy.push({ createdAt: sortOrder });
                break;
            case 'updatedAt':
                orderBy.push({ updatedAt: sortOrder });
                break;
            case 'title':
                orderBy.push({ title: sortOrder });
                break;
            case 'instructor':
                orderBy.push({
                    instructor: {
                        user: {
                            firstName: sortOrder,
                        },
                    },
                });
                orderBy.push({
                    instructor: {
                        user: {
                            lastName: sortOrder,
                        },
                    },
                });
                break;
            default:
                orderBy.push({ createdAt: 'desc' });
                break;
        }
        return orderBy;
    }
    async create(data, categoryIds, instructorId) {
        return this.prisma.course.create({
            data: {
                ...data,
                instructorId,
                categories: {
                    create: categoryIds.map((categoryId) => ({
                        categoryId,
                    })),
                },
            },
        });
    }
    async findAll(query) {
        const where = this.buildWhereClause(query);
        const orderBy = this.buildOrderByClause(query.sortBy, query.sortOrder);
        return this.prisma.course.findMany({
            where,
            orderBy,
            include: {
                instructor: {
                    include: {
                        user: true,
                    },
                },
                sections: {
                    take: 1,
                    orderBy: { createdAt: 'asc' },
                    include: {
                        modules: {
                            take: 1,
                            orderBy: { createdAt: 'asc' },
                        },
                    },
                },
                categories: {
                    include: {
                        category: true,
                    },
                },
            },
        });
    }
    async findById(id, query) {
        const include = {};
        if (query?.showInstructor) {
            include.instructor = { include: { user: true } };
        }
        if (query?.showSections) {
            include.sections = {
                include: {
                    modules: {
                        orderBy: {
                            createdAt: 'asc',
                        },
                    },
                },
            };
        }
        if (query?.showCategories) {
            include.categories = {
                include: {
                    category: true,
                },
            };
        }
        return this.prisma.course.findUnique({
            where: { id },
            include: Object.keys(include).length > 0 ? include : undefined,
        });
    }
    async findByInstructorId(instructorId, query) {
        const include = {};
        const where = {
            instructorId,
        };
        if (query?.categoryId) {
            where.categories = {
                some: {
                    categoryId: query.categoryId,
                },
            };
        }
        if (query?.showInstructor) {
            include.instructor = { include: { user: true } };
        }
        if (query?.showSections) {
            include.sections = {
                include: {
                    modules: {
                        orderBy: {
                            createdAt: 'asc',
                        },
                    },
                },
            };
        }
        if (query?.showCategories) {
            include.categories = {
                include: {
                    category: true,
                },
            };
        }
        return this.prisma.course.findMany({
            where,
            include: Object.keys(include).length > 0 ? include : undefined,
        });
    }
    async findInstructorIdByCourseId(courseId) {
        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
            select: { instructorId: true },
        });
        return course?.instructorId || null;
    }
    async update(id, data, categoryIds) {
        return this.prisma.$transaction(async (prisma) => {
            if (categoryIds) {
                await prisma.coursesCategories.deleteMany({
                    where: { courseId: id },
                });
                const newCategories = categoryIds.map((categoryId) => ({
                    courseId: id,
                    categoryId: categoryId,
                }));
                await prisma.coursesCategories.createMany({
                    data: newCategories,
                });
            }
            return prisma.course.update({
                where: { id },
                data: {
                    ...data,
                },
            });
        });
    }
    async remove(id) {
        return this.prisma.course.delete({
            where: { id },
        });
    }
};
exports.CoursesRepository = CoursesRepository;
exports.CoursesRepository = CoursesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoursesRepository);
//# sourceMappingURL=courses.repository.js.map