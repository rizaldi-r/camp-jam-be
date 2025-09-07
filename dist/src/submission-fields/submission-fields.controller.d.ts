import { CreateSubmissionFieldDto } from './dto/create-submission-field.dto';
import { UpdateSubmissionFieldDto } from './dto/update-submission-field.dto';
import { SubmissionFieldsService } from 'src/submission-fields/submission-fields.service';
export declare class SubmissionFieldsController {
    private readonly submissionFieldsService;
    constructor(submissionFieldsService: SubmissionFieldsService);
    create(createSubmissionFieldDto: CreateSubmissionFieldDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        isTextfield: boolean | null;
        submissionTemplateId: string;
    }>;
    findAll(submissionTemplateId?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        isTextfield: boolean | null;
        submissionTemplateId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        isTextfield: boolean | null;
        submissionTemplateId: string;
    }>;
    update(id: string, updateSubmissionFieldDto: UpdateSubmissionFieldDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        isTextfield: boolean | null;
        submissionTemplateId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        isTextfield: boolean | null;
        submissionTemplateId: string;
    }>;
}
