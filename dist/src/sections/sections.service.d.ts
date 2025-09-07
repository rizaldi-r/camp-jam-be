import { CreateSectionDto } from './dto/req/create-section.dto';
import { UpdateSectionDto } from './dto/req/update-section.dto';
import { SectionsRepository } from 'src/sections/sections.repository';
export declare class SectionsService {
    private readonly sectionsRepository;
    constructor(sectionsRepository: SectionsRepository);
    isInstructorOwner(sectionId: string, instructorId: string): Promise<boolean>;
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
    findById(id: string): Promise<{
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
