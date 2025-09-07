import { PrismaService } from 'src/prisma/prisma.service';
import { ModuleProgress } from '@prisma/client';
import { CreateModuleProgressData, ModuleProgressRepositoryItf, UpdateModuleProgressData } from 'src/module-progress/types/module-progress.controller.interface';
export declare class ModuleProgressRepository implements ModuleProgressRepositoryItf {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getStudentOwnerId(id: string): Promise<string | null>;
    getInstructorOwnerId(id: string): Promise<string | null>;
    create(data: CreateModuleProgressData): Promise<ModuleProgress>;
    findById(id: string): Promise<ModuleProgress | null>;
    findByEnrollmentAndModule(enrollmentId: string, moduleId: string): Promise<ModuleProgress | null>;
    findByEnrollmentId(enrollmentId: string): Promise<ModuleProgress[]>;
    findByModuleId(moduleId: string): Promise<ModuleProgress[]>;
    findAll(): Promise<ModuleProgress[]>;
    update(id: string, data: UpdateModuleProgressData): Promise<ModuleProgress>;
    delete(id: string): Promise<ModuleProgress>;
    updateAndRecalculateProgress(id: string, data: UpdateModuleProgressData, moduleType: string, isMarkingComplete: boolean, enrollmentModuleProgressId?: string, enrollmentLectureProgressId?: string, enrollmentAssignmentProgressId?: string): Promise<ModuleProgress>;
}
