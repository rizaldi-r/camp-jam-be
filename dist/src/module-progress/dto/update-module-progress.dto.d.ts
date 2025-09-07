import { CreateModuleProgressDto } from './create-module-progress.dto';
declare const UpdateModuleProgressDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateModuleProgressDto>>;
export declare class UpdateModuleProgressDto extends UpdateModuleProgressDto_base {
    isCompleted?: boolean;
}
export {};
