import { CreateSubdescriptionDto } from './dto/create-subdescription.dto';
import { UpdateSubdescriptionDto } from './dto/update-subdescription.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ModulesService } from 'src/modules/modules.service';
export declare class SubdescriptionsService {
    private readonly prisma;
    private readonly modulesService;
    constructor(prisma: PrismaService, modulesService: ModulesService);
    create(data: CreateSubdescriptionDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        moduleId: string;
        header: string;
        type: import(".prisma/client").$Enums.DescriptionType;
    }>;
    findAll(moduleId?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        moduleId: string;
        header: string;
        type: import(".prisma/client").$Enums.DescriptionType;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        moduleId: string;
        header: string;
        type: import(".prisma/client").$Enums.DescriptionType;
    }>;
    update(id: string, data: UpdateSubdescriptionDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        moduleId: string;
        header: string;
        type: import(".prisma/client").$Enums.DescriptionType;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        moduleId: string;
        header: string;
        type: import(".prisma/client").$Enums.DescriptionType;
    }>;
}
