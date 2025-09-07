import { CreateSubdescriptionDto } from './dto/create-subdescription.dto';
import { UpdateSubdescriptionDto } from './dto/update-subdescription.dto';
import { SubdescriptionsService } from 'src/subdescriptions/subdescriptions.service';
export declare class SubdescriptionsController {
    private readonly service;
    constructor(service: SubdescriptionsService);
    create(createSubdescriptionDto: CreateSubdescriptionDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        moduleId: string;
        header: string;
        type: import(".prisma/client").$Enums.DescriptionType;
    }>;
    findAll(): Promise<{
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
    update(id: string, updateSubdescriptionDto: UpdateSubdescriptionDto): Promise<{
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
