import { SubmissionFieldValueDto } from 'src/submissions/dto/create-submission.dto';
export declare class UpdateSubmissionDto {
    submissionFieldValueData?: SubmissionFieldValueDto[];
}
export declare class LockSubmissionDto {
    isLocked: boolean;
}
export declare class GradeSubmissionDto {
    isPassed: boolean;
    scoreAchieved: number;
    feedback?: string;
}
