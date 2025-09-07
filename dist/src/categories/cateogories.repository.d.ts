import { PrismaService } from '../prisma/prisma.service';
import { Category } from '@prisma/client';
import { CreateCategoryItf, FindAllCategoriesItf, UpdateCategoryItf } from 'src/categories/types/cateogories.repository.interfaces';
export declare class CategoriesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateCategoryItf): Promise<Category>;
    findAll(query: FindAllCategoriesItf): Promise<Category[]>;
    findById(id: string): Promise<Category | null>;
    findByIdList(ids: string[]): Promise<Category[]>;
    update(id: string, data: UpdateCategoryItf): Promise<Category>;
    remove(id: string): Promise<Category>;
}
