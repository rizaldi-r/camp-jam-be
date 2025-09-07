import { ModulesRepository } from 'src/modules/modules.repository';
import { CreateModuleDto } from 'src/modules/dto/create-module.dto';
import { UpdateModuleDto } from 'src/modules/dto/update-module.dto';
import { SubmissionsService } from 'src/submissions/submissions.service';
import { SubmissionTemplatesService } from 'src/submission-templates/submission-templates.service';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
import { ModuleProgressService } from 'src/module-progress/module-progress.service';
export declare class ModulesService {
    private readonly modulesRepository;
    private readonly submissionsService;
    private readonly submissionTemplatesService;
    private readonly enrollmentsService;
    private readonly moduleProgressService;
    constructor(modulesRepository: ModulesRepository, submissionsService: SubmissionsService, submissionTemplatesService: SubmissionTemplatesService, enrollmentsService: EnrollmentsService, moduleProgressService: ModuleProgressService);
    isInstructorOwner(resourceId: string, userId: string): Promise<boolean>;
    findCourseByModuleId(moduleId: string): Promise<{
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
    create(createDto: CreateModuleDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        moduleType: import(".prisma/client").$Enums.ModuleType;
        embedVideoLink: string | null;
        sectionId: string;
    }>;
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
    findById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        moduleType: import(".prisma/client").$Enums.ModuleType;
        embedVideoLink: string | null;
        sectionId: string;
    }>;
    update(id: string, updateDto: UpdateModuleDto): Promise<{
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
