import { CreateEnrollmentDto } from './create-enrollment.dto';
import { CourseStatus } from '@prisma/client';
declare const UpdateEnrollmentDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateEnrollmentDto>>;
export declare class UpdateEnrollmentDto extends UpdateEnrollmentDto_base {
    status?: CourseStatus;
}
export {};
