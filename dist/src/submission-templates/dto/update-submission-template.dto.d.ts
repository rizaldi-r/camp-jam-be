export declare class UpdateSubmissionFieldDto {
    label: string;
    isTextfield?: boolean;
}
export declare class UpdateSubmissionTemplateDto {
    submissionTitle: string;
    scoreTotal?: number;
    submissionFields?: UpdateSubmissionFieldDto[];
}
