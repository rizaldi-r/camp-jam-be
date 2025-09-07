export declare class CreateSubmissionFieldDto {
    label: string;
    isTextfield: boolean;
}
export declare class CreateSubmissionTemplateDto {
    submissionTitle: string;
    moduleId: string;
    scoreTotal?: number;
    submissionFields: CreateSubmissionFieldDto[];
}
