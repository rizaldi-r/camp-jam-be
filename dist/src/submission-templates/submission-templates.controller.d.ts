import { CreateSubmissionTemplateDto } from 'src/submission-templates/dto/create-submission-template.dto';
import { UpdateSubmissionTemplateDto } from 'src/submission-templates/dto/update-submission-template.dto';
import { SubmissionTemplate } from '@prisma/client';
import { SubmissionTemplatesService } from 'src/submission-templates/submission-templates.service';
export declare class SubmissionTemplatesController {
    private readonly submissionTemplatesService;
    constructor(submissionTemplatesService: SubmissionTemplatesService);
    create(createSubmissionTemplateDto: CreateSubmissionTemplateDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        endDate: Date | null;
        submissionTitle: string;
        scoreTotal: number;
        moduleId: string;
    }>;
    findAll(): Promise<SubmissionTemplate[] | null>;
    findOne(id: string): Promise<SubmissionTemplate | null>;
    findByModuleId(moduleId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        endDate: Date | null;
        submissionTitle: string;
        scoreTotal: number;
        moduleId: string;
    }>;
    findByCourseId(courseId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        endDate: Date | null;
        submissionTitle: string;
        scoreTotal: number;
        moduleId: string;
    }[]>;
    update(id: string, updateSubmissionTemplateDto: UpdateSubmissionTemplateDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        endDate: Date | null;
        submissionTitle: string;
        scoreTotal: number;
        moduleId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        endDate: Date | null;
        submissionTitle: string;
        scoreTotal: number;
        moduleId: string;
    }>;
}
