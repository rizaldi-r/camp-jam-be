import { CreateSubmissionFieldDto } from './dto/create-submission-field.dto';
import { UpdateSubmissionFieldDto } from './dto/update-submission-field.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class SubmissionFieldsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateSubmissionFieldDto): Promise<{
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
    update(id: string, data: UpdateSubmissionFieldDto): Promise<{
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
