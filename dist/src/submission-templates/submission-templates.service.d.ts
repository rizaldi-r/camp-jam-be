import { SubmissionField, SubmissionTemplate } from '@prisma/client';
import { CreateSubmissionTemplateDto } from 'src/submission-templates/dto/create-submission-template.dto';
import { UpdateSubmissionTemplateDto } from 'src/submission-templates/dto/update-submission-template.dto';
import { SubmissionTemplatesRepository } from 'src/submission-templates/submission-template.repository';
export declare class SubmissionTemplatesService {
    private readonly submissionTemplatesRepository;
    constructor(submissionTemplatesRepository: SubmissionTemplatesRepository);
    isInstructorOwner(templateId: string, instructorId: string): Promise<boolean>;
    createTemplate(data: CreateSubmissionTemplateDto): Promise<SubmissionTemplate>;
    getAllTemplates(): Promise<SubmissionTemplate[]>;
    getTemplateById(id: string): Promise<SubmissionTemplate>;
    getTemplateByModuleId(moduleId: string): Promise<SubmissionTemplate>;
    getTemplateByCourseId(courseId: string): Promise<SubmissionTemplate[]>;
    getSubmissionFieldsByTemplateId(templateId: string): Promise<SubmissionField[]>;
    updateTemplate(id: string, data: UpdateSubmissionTemplateDto): Promise<SubmissionTemplate>;
    deleteTemplate(id: string): Promise<SubmissionTemplate>;
}
