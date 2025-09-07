import { PrismaService } from '../prisma/prisma.service';
import { SubmissionField, SubmissionTemplate } from '@prisma/client';
import { CreateSubmissionTemplateData, SubmissionTemplateRepositoryItf, UpdateSubmissionTemplateData } from 'src/submission-templates/types/submission-template.repository.interface';
export declare class SubmissionTemplatesRepository implements SubmissionTemplateRepositoryItf {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getOwnerId(id: string): Promise<string | null>;
    create(data: CreateSubmissionTemplateData): Promise<SubmissionTemplate>;
    findById(id: string): Promise<SubmissionTemplate | null>;
    findByModuleId(moduleId: string): Promise<SubmissionTemplate | null>;
    findByCourseId(courseId: string): Promise<SubmissionTemplate[]>;
    findAll(): Promise<SubmissionTemplate[]>;
    findFieldsByTemplateId(templateId: string): Promise<SubmissionField[]>;
    update(id: string, data: UpdateSubmissionTemplateData): Promise<SubmissionTemplate>;
    delete(id: string): Promise<SubmissionTemplate>;
}
