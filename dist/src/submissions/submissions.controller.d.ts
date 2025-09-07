import { Submission } from '@prisma/client';
import { SubmissionsService } from 'src/submissions/submissions.service';
import { GradeSubmissionDto, LockSubmissionDto, UpdateSubmissionDto } from 'src/submissions/dto/update-submission.dto';
export declare class SubmissionsController {
    private readonly submissionsService;
    constructor(submissionsService: SubmissionsService);
    findAll(): Promise<Submission[]>;
    findOne(id: string): Promise<Submission>;
    findByEnrollment(enrollmentId: string): Promise<Submission[]>;
    update(id: string, updateSubmissionDto: UpdateSubmissionDto): Promise<Submission>;
    lock(id: string, lockDto: LockSubmissionDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isLocked: boolean;
        scoreTotal: number;
        moduleId: string;
        submissionTemplateId: string;
        studentId: string;
        isGraded: boolean;
        isPassed: boolean;
        scorePercentage: import(".prisma/client/runtime/library").Decimal;
        scoreAchieved: import(".prisma/client/runtime/library").Decimal;
        feedback: string | null;
        enrollmentId: string;
    }>;
    lockSubmissionsByModuleId(moduleId: string, lockDto: LockSubmissionDto): Promise<void>;
    grade(id: string, gradeSubmissionDto: GradeSubmissionDto): Promise<Submission>;
}
