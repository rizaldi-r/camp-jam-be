import { CreateSectionDto } from './dto/req/create-section.dto';
import { UpdateSectionDto } from './dto/req/update-section.dto';
import { SectionsService } from 'src/sections/sections.service';
export declare class SectionsController {
    private readonly sectionsService;
    constructor(sectionsService: SectionsService);
    create(createDto: CreateSectionDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        courseId: string;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        courseId: string;
    }[]>;
    findAllByCourseId(courseId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        courseId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        courseId: string;
    }>;
    update(id: string, updateDto: UpdateSectionDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        courseId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        courseId: string;
    }>;
}
