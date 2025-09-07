import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { LinksService } from 'src/links/links.service';
export declare class LinksController {
    private readonly linksService;
    constructor(linksService: LinksService);
    create(createLinkDto: CreateLinkDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        moduleId: string;
        label: string;
        href: string;
    }>;
    findAll(): Promise<{
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
