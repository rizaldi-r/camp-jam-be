export declare class SubmissionFieldValueDto {
    submissionFieldId: string;
    submitted?: string;
}
export declare class CreateSubmissionDto {
    moduleId: string;
    enrollmentId: string;
    scoreTotal: number;
    submissionFieldValueData: SubmissionFieldValueDto[];
}
