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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const custom_not_found_exception_1 = require("../_common/exceptions/custom-not-found.exception");
const courses_repository_1 = require("./courses.repository");
const instructors_service_1 = require("../instructors/instructors.service");
const categories_service_1 = require("../categories/categories.service");
let CoursesService = class CoursesService {
    coursesRepository;
    instructorsService;
    categoriesService;
    constructor(coursesRepository, instructorsService, categoriesService) {
        this.coursesRepository = coursesRepository;
        this.instructorsService = instructorsService;
        this.categoriesService = categoriesService;
    }
    async isInstructorOwner(resourceId, userId) {
        const instructorId = await this.coursesRepository.findInstructorIdByCourseId(resourceId);
        return instructorId === userId;
    }
    async create(createDto, instructorId) {
        const { categoryIds, ...courseData } = createDto;
        return this.coursesRepository.create(courseData, categoryIds, instructorId);
    }
    async findAll(query) {
        return this.coursesRepository.findAll(query);
    }
    async findById(id, query) {
        const course = await this.coursesRepository.findById(id, query);
        if (!course) {
            throw new custom_not_found_exception_1.ResourceNotFoundException('Course', 'id', id);
        }
        return course;
    }
    async findByInstructorId(instructorId, query) {
        const course = await this.coursesRepository.findByInstructorId(instructorId, query);
        if (!course) {
            throw new custom_not_found_exception_1.ResourceNotFoundException('Course', 'instructor Id', instructorId);
        }
        return course;
    }
    async update(id, updateDto) {
        await this.findById(id);
        if (updateDto.instructorId) {
            await this.instructorsService.findInstructorById(updateDto.instructorId);
        }
        if (updateDto.categoryIds) {
            await this.categoriesService.findByIdList(updateDto.categoryIds);
        }
        const { categoryIds, ...courseData } = updateDto;
        return this.coursesRepository.update(id, courseData, categoryIds);
    }
    async remove(id) {
        await this.findById(id);
        return this.coursesRepository.remove(id);
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [courses_repository_1.CoursesRepository,
        instructors_service_1.InstructorsService,
        categories_service_1.CategoriesService])
], CoursesService);
//# sourceMappingURL=courses.service.js.map