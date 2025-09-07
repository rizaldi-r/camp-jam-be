import { ModuleProgressService } from './module-progress.service';
import { UpdateModuleProgressDto } from './dto/update-module-progress.dto';
import { ModuleProgress } from '@prisma/client';
export declare class ModuleProgressController {
    private readonly moduleProgressService;
    constructor(moduleProgressService: ModuleProgressService);
    findAll(): Promise<ModuleProgress[]>;
    findByEnrollmentId(enrollmentId: string): Promise<ModuleProgress[]>;
    findByModuleId(moduleId: string): Promise<ModuleProgress[]>;
    findOne(id: string): Promise<ModuleProgress>;
    update(id: string, updateModuleProgressDto: UpdateModuleProgressDto): Promise<ModuleProgress>;
}
