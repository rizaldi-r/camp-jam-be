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
exports.SectionsService = void 0;
const common_1 = require("@nestjs/common");
const sections_repository_1 = require("./sections.repository");
const custom_not_found_exception_1 = require("../_common/exceptions/custom-not-found.exception");
let SectionsService = class SectionsService {
    sectionsRepository;
    constructor(sectionsRepository) {
        this.sectionsRepository = sectionsRepository;
    }
    async isInstructorOwner(sectionId, instructorId) {
        const ownerId = await this.sectionsRepository.getOwnerId(sectionId);
        return ownerId === instructorId;
    }
    async create(createDto) {
        return this.sectionsRepository.create(createDto);
    }
    async findAll() {
        return this.sectionsRepository.findAll();
    }
    async findAllByCourseId(courseId) {
        return this.sectionsRepository.findAllByCourseId(courseId);
    }
    async findById(id) {
        const section = await this.sectionsRepository.findById(id);
        if (!section) {
            throw new custom_not_found_exception_1.ResourceNotFoundException('Section', 'id', id);
        }
        return section;
    }
    async update(id, updateDto) {
        await this.findById(id);
        return this.sectionsRepository.update(id, updateDto);
    }
    async remove(id) {
        await this.findById(id);
        return this.sectionsRepository.remove(id);
    }
};
exports.SectionsService = SectionsService;
exports.SectionsService = SectionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sections_repository_1.SectionsRepository])
], SectionsService);
//# sourceMappingURL=sections.service.js.map