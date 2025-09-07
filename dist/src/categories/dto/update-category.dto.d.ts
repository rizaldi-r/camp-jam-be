import { CreateCategoryDto } from './create-category.dto';
import { Program } from '@prisma/client';
declare const UpdateCategoryDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCategoryDto>>;
export declare class UpdateCategoryDto extends UpdateCategoryDto_base {
    name?: string;
    programs?: Program[];
}
export {};
