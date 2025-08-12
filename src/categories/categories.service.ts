import { Injectable } from '@nestjs/common';
import { ResourceNotFoundException } from '../_common/exceptions/custom-not-found.exception';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { CategoriesRepository } from 'src/categories/cateogories.repository';
import { UpdateCategoryDto } from 'src/categories/dto/update-category.dto';
import { FindAllCategoriesDto } from 'src/categories/dto/find-query-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async create(createDto: CreateCategoryDto) {
    return this.categoriesRepository.create(createDto);
  }

  // TODO: find based on the student program
  async findAll(query: FindAllCategoriesDto) {
    return this.categoriesRepository.findAll(query);
  }

  async findOne(id: string) {
    const category = await this.categoriesRepository.findById(id);
    if (!category) {
      throw new ResourceNotFoundException('Category', 'id', id);
    }
    return category;
  }

  async update(id: string, updateDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findById(id);
    if (!category) {
      throw new ResourceNotFoundException('Category', 'id', id);
    }
    return this.categoriesRepository.update(id, updateDto);
  }

  async remove(id: string) {
    const category = await this.categoriesRepository.findById(id);
    if (!category) {
      throw new ResourceNotFoundException('Category', 'id', id);
    }
    return this.categoriesRepository.remove(id);
  }
}
