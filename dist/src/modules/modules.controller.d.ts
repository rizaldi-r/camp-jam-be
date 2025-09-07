import { ModulesService } from 'src/modules/modules.service';
import { CreateModuleDto } from 'src/modules/dto/create-module.dto';
import { UpdateModuleDto } from 'src/modules/dto/update-module.dto';
export declare class ModulesController {
    private readonly modulesService;
    constructor(modulesService: ModulesService);
    findCourseByModuleId(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        imageSrc: string | null;
        imageAlt: string | null;
        description: string | null;
        startDate: Date | null;
        endDate: Date | null;
        isMemberOnly: boolean;
        isLocked: boolean;
        allowedPrograms: import(".prisma/client").$Enums.Program[];
        allowedBatchYears: number[];
        instructorId: string;
    }>;
    create(createModuleDto: CreateModuleDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        moduleType: import(".prisma/client").$Enums.ModuleType;
        embedVideoLink: string | null;
        sectionId: string;
    }>;
    findAll(sectionId?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        moduleType: import(".prisma/client").$Enums.ModuleType;
        embedVideoLink: string | null;
        sectionId: string;
    }[]>;
    findByCourse(courseId: string): Promise<import("./types/modules.repository.interface").ModuleWithChildrens[]>;
    findBySection(sectionId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        moduleType: import(".prisma/client").$Enums.ModuleType;
        embedVideoLink: string | null;
        sectionId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        moduleType: import(".prisma/client").$Enums.ModuleType;
        embedVideoLink: string | null;
        sectionId: string;
    }>;
    update(id: string, updateModuleDto: UpdateModuleDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        moduleType: import(".prisma/client").$Enums.ModuleType;
        embedVideoLink: string | null;
        sectionId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        moduleType: import(".prisma/client").$Enums.ModuleType;
        embedVideoLink: string | null;
        sectionId: string;
    }>;
}
