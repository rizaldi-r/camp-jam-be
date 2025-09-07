import { SubmissionFieldDto, SubmissionTemplateDto } from 'src/modules/dto/res/module-response.dto';
export declare class SubmissionFieldValueDto {
    id: string;
    submitted: string;
    submissionId: string;
    submissionFieldId: string;
    createdAt: string;
    updatedAt: string;
    submissionField: SubmissionFieldDto;
}
export declare class SubmissionResponseDto {
    id: string;
    studentId: string;
    enrollmentId: string;
    moduleId: string;
    submissionTemplateId: string;
    isLocked: boolean;
    isGraded: boolean;
    isPassed: boolean;
    scorePercentage: string;
    scoreAchieved: string;
    scoreTotal: number;
    feedback: string | null;
    createdAt: string;
    updatedAt: string;
    submissionTemplate: SubmissionTemplateDto[];
    submissionFieldValue: SubmissionFieldValueDto[];
}
