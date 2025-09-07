import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ModulesService } from 'src/modules/modules.service';
export declare class LinksService {
    private prisma;
    private readonly modulesService;
    constructor(prisma: PrismaService, modulesService: ModulesService);
    create(createLinkDto: CreateLinkDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        moduleId: string;
        label: string;
        href: string;
    }>;
    findAll(moduleId?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        moduleId: string;
        label: string;
        href: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        moduleId: string;
        label: string;
        href: string;
    }>;
    update(id: string, updateLinkDto: UpdateLinkDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        moduleId: string;
        label: string;
        href: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        moduleId: string;
        label: string;
        href: string;
    }>;
}
