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
exports.EnrollmentsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const enrollments_repository_interface_1 = require("./types/enrollments.repository.interface");
let EnrollmentsRepository = class EnrollmentsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    buildSearchCondition(search) {
        const { searchQuery, searchBy } = search;
        if (!searchQuery.trim())
            return {};
        switch (searchBy) {
            case enrollments_repository_interface_1.SearchBy.TITLE:
                return {
                    course: {
                        title: {
                            contains: searchQuery,
                            mode: 'insensitive',
                        },
                    },
                };
            case enrollments_repository_interface_1.SearchBy.INSTRUCTOR_NAME:
                return {
                    instructor: {
                        user: {
                            OR: [
                                {
                                    firstName: {
                                        contains: searchQuery,
                                        mode: 'insensitive',
                                    },
                                },
                                {
                                    lastName: {
                                        contains: searchQuery,
                                        mode: 'insensitive',
                                    },
                                },
                                {
                                    AND: [
                                        {
                                            OR: searchQuery.split(' ').map((term) => ({
                                                OR: [
                                                    {
                                                        firstName: {
                                                            contains: term,
                                                            mode: 'insensitive',
                                                        },
                                                    },
                                                    {
                                                        lastName: {
                                                            contains: term,
                                                            mode: 'insensitive',
                                                        },
                                                    },
                                                ],
                                            })),
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                };
            default:
                return {};
        }
    }
    buildOrderByClause(sort) {
        if (!sort) {
            return [{ createdAt: 'desc' }];
        }
        const { sortBy, sortOrder } = sort;
        switch (sortBy) {
            case enrollments_repository_interface_1.SortBy.TITLE:
                return [
                    {
                        course: {
                            title: sortOrder,
                        },
                    },
                ];
            case enrollments_repository_interface_1.SortBy.CREATED_AT:
                return [{ createdAt: sortOrder }];
            default:
                return [{ createdAt: 'desc' }];
        }
    }
    async getStudentOwnerId(id) {
        const enrollment = await this.prisma.enrollment.findUnique({
            where: { id },
            select: {
                studentId: true,
            },
        });
        return enrollment?.studentId ?? null;
    }
    async getInstructorOwnerId(id) {
        const enrollment = await this.prisma.enrollment.findUnique({
            where: { id },
            select: {
                instructorId: true,
            },
        });
        return enrollment?.instructorId ?? null;
    }
    async create(data) {
        return this.prisma.enrollment.create({
            data,
        });
    }
    async createEnrollmentDataRecords(enrollmentId, moduleTotal, lectureTotal, assignmentTotal, totalAssignmentScore) {
        await this.prisma.$transaction(async (prisma) => {
            const moduleProgressData = await prisma.enrollmentData.create({
                data: {
                    moduleTotal: moduleTotal,
                    moduleCompleted: 0,
                },
            });
            const lectureProgressData = await prisma.enrollmentData.create({
                data: {
                    moduleTotal: lectureTotal,
                    moduleCompleted: 0,
                },
            });
            const assignmentProgressData = await prisma.enrollmentData.create({
                data: {
                    moduleTotal: assignmentTotal,
                    moduleCompleted: 0,
                },
            });
            const assignmentScoresData = await prisma.enrollmentData.create({
                data: {
                    moduleTotal: totalAssignmentScore,
                    moduleCompleted: 0,
                },
            });
            await prisma.enrollment.update({
                where: { id: enrollmentId },
                data: {
                    moduleProgress: { connect: { id: moduleProgressData.id } },
                    lectureProgress: { connect: { id: lectureProgressData.id } },
                    assignmentProgress: { connect: { id: assignmentProgressData.id } },
                    assignmentScore: { connect: { id: assignmentScoresData.id } },
                },
            });
        });
    }
    async findById(id, query) {
        const { includeSubmissions, includeAllProgress, includeCourse, includeSections, } = query || {};
        const include = {
            instructor: { include: { user: true } },
            student: { include: { user: true } },
            moduleProgress: true,
            lectureProgress: includeAllProgress ? true : false,
            assignmentProgress: includeAllProgress ? true : false,
            assignmentScore: includeAllProgress ? true : false,
            course: includeCourse
                ? {
                    include: {
                        sections: includeSections
                            ? { include: { modules: true } }
                            : false,
                        categories: {
                            include: { category: true },
                        },
                    },
                }
                : false,
            submissions: includeSubmissions
                ? {
                    include: {
                        submissionTemplate: true,
                        submissionFieldValue: {
                            include: {
                                submissionField: true,
                            },
                        },
                    },
                }
                : false,
        };
        return this.prisma.enrollment.findUnique({
            where: { id },
            include,
        });
    }
    async findByStudentId(studentId, query) {
        const { includeSubmissions, includeAllProgress, includeCourse, includeSections, includeModuleProgresses, courseId, courseCategoryId, search, sort, } = query;
        const include = {
            instructor: { include: { user: true } },
            moduleProgress: true,
            lectureProgress: includeAllProgress ? true : false,
            assignmentProgress: includeAllProgress ? true : false,
            assignmentScore: includeAllProgress ? true : false,
            moduleProgresses: includeModuleProgresses ? true : false,
            course: includeCourse
                ? {
                    include: {
                        sections: includeSections
                            ? { include: { modules: true } }
                            : false,
                        categories: {
                            include: { category: true },
                        },
                    },
                }
                : false,
            submissions: includeSubmissions
                ? {
                    include: {
                        submissionTemplate: true,
                        submissionFieldValue: {
                            include: {
                                submissionField: true,
                            },
                        },
                    },
                }
                : false,
        };
        const where = {
            studentId,
            ...(courseId && { courseId }),
            ...(courseCategoryId && {
                course: {
                    categories: {
                        some: {
                            categoryId: courseCategoryId,
                        },
                    },
                },
            }),
            ...(search && this.buildSearchCondition(search)),
        };
        const orderBy = this.buildOrderByClause(sort);
        return this.prisma.enrollment.findMany({
            where,
            include,
            orderBy,
        });
    }
    async findByStudentAndCourse(studentId, courseId) {
        return this.prisma.enrollment.findUnique({
            where: {
                studentId_courseId: {
                    studentId: studentId,
                    courseId: courseId,
                },
            },
        });
    }
    async findAll() {
        return this.prisma.enrollment.findMany({
            include: {
                moduleProgress: true,
                lectureProgress: true,
                assignmentProgress: true,
                assignmentScore: true,
            },
        });
    }
    async findByCourseId(courseId) {
        return this.prisma.enrollment.findMany({
            where: {
                courseId: courseId,
            },
            include: {
                moduleProgress: true,
                lectureProgress: true,
                assignmentProgress: true,
                assignmentScore: true,
                submissions: {
                    include: {
                        submissionTemplate: true,
                        submissionFieldValue: {
                            include: { submissionField: true },
                        },
                    },
                },
                instructor: { include: { user: true } },
                student: { include: { user: true } },
            },
        });
    }
    async getEnrollmentDataAssignmentByEnrollmentId(enrollmentId) {
        const enrollmentData = await this.prisma.enrollmentData.findUnique({
            where: { assignmentScoreId: enrollmentId },
        });
        return enrollmentData;
    }
    async update(id, data) {
        return this.prisma.enrollment.update({
            where: { id },
            data,
        });
    }
    async updateEnrollmentDataAssignment(enrollmentId, data) {
        const enrollmentData = await this.prisma.enrollmentData.update({
            where: { assignmentScoreId: enrollmentId },
            data,
        });
        return enrollmentData;
    }
    async delete(id) {
        return this.prisma.enrollment.delete({ where: { id } });
    }
};
exports.EnrollmentsRepository = EnrollmentsRepository;
exports.EnrollmentsRepository = EnrollmentsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EnrollmentsRepository);
//# sourceMappingURL=enrollments.repository.js.map