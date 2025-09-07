import { CreateModuleProgressDto } from './dto/create-module-progress.dto';
import { UpdateModuleProgressDto } from './dto/update-module-progress.dto';
import { ModuleProgress } from '@prisma/client';
import { ModuleProgressRepository } from './module-progress.repository';
import { ModulesService } from 'src/modules/modules.service';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
export declare class ModuleProgressService {
    private readonly moduleProgressRepository;
    private readonly enrollmentsService;
    private readonly modulesService;
    constructor(moduleProgressRepository: ModuleProgressRepository, enrollmentsService: EnrollmentsService, modulesService: ModulesService);
    isStudentOwner(id: string, studentId: string): Promise<boolean>;
    createModuleProgress(data: CreateModuleProgressDto): Promise<ModuleProgress>;
    getModuleProgressById(id: string): Promise<ModuleProgress>;
    getModuleProgressByEnrollmentId(enrollmentId: string): Promise<ModuleProgress[]>;
    getModuleProgressByModuleId(moduleId: string): Promise<ModuleProgress[]>;
    getAllModuleProgress(): Promise<ModuleProgress[]>;
    updateModuleProgress(id: string, data: UpdateModuleProgressDto): Promise<ModuleProgress>;
    deleteModuleProgress(id: string): Promise<ModuleProgress>;
}
