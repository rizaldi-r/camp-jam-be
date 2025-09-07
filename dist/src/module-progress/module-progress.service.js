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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleProgressService = void 0;
const common_1 = require("@nestjs/common");
const custom_not_found_exception_1 = require("../_common/exceptions/custom-not-found.exception");
const module_progress_repository_1 = require("./module-progress.repository");
const modules_service_1 = require("../modules/modules.service");
const enrollments_service_1 = require("../enrollments/enrollments.service");
let ModuleProgressService = class ModuleProgressService {
    moduleProgressRepository;
    enrollmentsService;
    modulesService;
    constructor(moduleProgressRepository, enrollmentsService, modulesService) {
        this.moduleProgressRepository = moduleProgressRepository;
        this.enrollmentsService = enrollmentsService;
        this.modulesService = modulesService;
    }
    async isStudentOwner(id, studentId) {
        const ownerId = await this.moduleProgressRepository.getStudentOwnerId(id);
        return ownerId === studentId;
    }
    async createModuleProgress(data) {
        const existingProgress = await this.moduleProgressRepository.findByEnrollmentAndModule(data.enrollmentId, data.moduleId);
        if (existingProgress) {
            throw new common_1.ConflictException('Module progress for this enrollment and module already exists.');
        }
        return this.moduleProgressRepository.create(data);
    }
    async getModuleProgressById(id) {
        const progress = await this.moduleProgressRepository.findById(id);
        if (!progress) {
            throw new custom_not_found_exception_1.ResourceNotFoundException('ModuleProgress', 'id', id);
        }
        return progress;
    }
    async getModuleProgressByEnrollmentId(enrollmentId) {
        return this.moduleProgressRepository.findByEnrollmentId(enrollmentId);
    }
    async getModuleProgressByModuleId(moduleId) {
        return this.moduleProgressRepository.findByModuleId(moduleId);
    }
    async getAllModuleProgress() {
        return this.moduleProgressRepository.findAll();
    }
    async updateModuleProgress(id, data) {
        const existingProgress = await this.getModuleProgressById(id);
        const isMarkingComplete = data.isCompleted === true && existingProgress.isCompleted === false;
        const isMarkingIncomplete = data.isCompleted === false && existingProgress.isCompleted === true;
        if (isMarkingComplete || isMarkingIncomplete) {
            const enrollment = await this.enrollmentsService.getEnrollmentById(existingProgress.enrollmentId, { includeAllProgress: true });
            const module = await this.modulesService.findById(existingProgress.moduleId);
            const updatedProgress = await this.moduleProgressRepository.updateAndRecalculateProgress(id, data, module.moduleType, isMarkingComplete, enrollment.moduleProgress?.id, enrollment.lectureProgress?.id, enrollment.assignmentProgress?.id);
            return updatedProgress;
        }
        else {
            return this.moduleProgressRepository.update(id, data);
        }
    }
    async deleteModuleProgress(id) {
        await this.getModuleProgressById(id);
        return this.moduleProgressRepository.delete(id);
    }
};
exports.ModuleProgressService = ModuleProgressService;
exports.ModuleProgressService = ModuleProgressService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => enrollments_service_1.EnrollmentsService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => modules_service_1.ModulesService))),
    __metadata("design:paramtypes", [module_progress_repository_1.ModuleProgressRepository,
        enrollments_service_1.EnrollmentsService,
        modules_service_1.ModulesService])
], ModuleProgressService);
//# sourceMappingURL=module-progress.service.js.map