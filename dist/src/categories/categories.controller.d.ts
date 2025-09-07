import { CategoriesService } from 'src/categories/categories.service';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/categories/dto/update-category.dto';
import { FindAllCategoriesDto } from 'src/categories/dto/find-query-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createDto: CreateCategoryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        programs: import(".prisma/client").$Enums.Program[];
    }>;
    findAll(query: FindAllCategoriesDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        programs: import(".prisma/client").$Enums.Program[];
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        programs: import(".prisma/client").$Enums.Program[];
    }>;
    update(id: string, updateDto: UpdateCategoryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        programs: import(".prisma/client").$Enums.Program[];
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        programs: import(".prisma/client").$Enums.Program[];
    }>;
}
