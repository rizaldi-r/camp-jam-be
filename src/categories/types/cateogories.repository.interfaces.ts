import { Program } from '@prisma/client';

export interface CreateCategoryItf {
  name: string;
  programs: Program[];
}

export interface UpdateCategoryItf {
  name?: string;
  programs?: Program[];
}

export interface FindAllCategoriesItf {
  name?: string;
  program?: Program;
}
