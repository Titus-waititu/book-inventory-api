import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
   constructor(
          @InjectRepository(Category) private categoriesRepository:Repository<Category>,
        ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoriesRepository.save(createCategoryDto).then((category) => {
      return this.categoriesRepository.findOneBy({ id: category.id });
    });
  }

  async findAll(): Promise<Category[] | string> {
    return await this.categoriesRepository.find({
      relations: ['books'],
      order: {
        name: 'ASC',
      },
    }).catch((error) => {
      throw new NotFoundException(`Error fetching categories: ${error.message}`);
    });
  }

  async findOne(id: string): Promise<Category | string> {
    return await this.categoriesRepository.findOne({
      where: { id },
      relations: ['books'],
    }).then((category) => {
      if (!category) {
        throw new NotFoundException(`Category with id ${id} not found`);
      }
      return category;
    }).catch((error) => {
      throw new NotFoundException(`Error fetching category: ${error.message}`);
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto){
    return await this.categoriesRepository.findOneBy({ id }).then(async (category) => {
      if (!category) {
        throw new NotFoundException(`Category with id ${id} not found`);
      }
      Object.assign(category, updateCategoryDto);
      return await this.categoriesRepository.save(category).then((updatedCategory) => {
        return this.categoriesRepository.findOneBy({ id: updatedCategory.id });
      });
    }).catch((error) => {
      throw new NotFoundException(`Error updating category: ${error.message}`);
    });
  }

  async remove(id: number) : Promise<{ message: string } | string> {
    return await this.categoriesRepository.delete(id).then((result) => {
      if (result.affected === 0) {
        throw new NotFoundException(`Category with id ${id} not found`);
      }
      return { message: `Category with id ${id} deleted successfully` };
    }).catch((error) => {
      throw new NotFoundException(`Error deleting category: ${error.message}`);
    });
  }
}
