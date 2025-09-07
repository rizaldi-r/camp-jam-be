import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { CategoriesRepository } from 'src/categories/cateogories.repository';
import { UpdateCategoryDto } from 'src/categories/dto/update-category.dto';
import { FindAllCategoriesDto } from 'src/categories/dto/find-query-category.dto';
export declare class CategoriesService {
    private readonly categoriesRepository;
    constructor(categoriesRepository: CategoriesRepository);
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
    findByIdList(ids: string[]): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        programs: import(".prisma/client").$Enums.Program[];
    }[]>;
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
