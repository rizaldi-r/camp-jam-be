import { PrismaService } from '../prisma/prisma.service';
import { Course, Module } from '@prisma/client';
import { CreateModuleData, ModuleWithChildrens, UpdateModuleData } from 'src/modules/types/modules.repository.interface';
export declare class ModulesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findCourseByModuleId(moduleId: string): Promise<Course | null>;
    create(createData: CreateModuleData): Promise<Module>;
    findByCourseId(courseId: string): Promise<ModuleWithChildrens[]>;
    findBySectionId(sectionId: string): Promise<Module[]>;
    findAll(sectionId?: string): Promise<Module[]>;
    findById(id: string): Promise<Module | null>;
    findInstructorIdByModuleId(moduleId: string): Promise<string | null>;
    update(id: string, updateData: UpdateModuleData): Promise<Module>;
    remove(id: string): Promise<Module>;
}
