import { PrismaService } from '../prisma/prisma.service';
import { Section } from '@prisma/client';
import { CreateSectionItf, UpdateSectionItf } from 'src/sections/types/sections.repository.interface';
export declare class SectionsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateSectionItf): Promise<Section>;
    findAll(): Promise<Section[]>;
    findAllByCourseId(courseId: string): Promise<Section[]>;
    findById(id: string): Promise<Section | null>;
    getOwnerId(sectionId: string): Promise<string | null>;
    update(id: string, data: UpdateSectionItf): Promise<Section>;
    remove(id: string): Promise<Section>;
}
