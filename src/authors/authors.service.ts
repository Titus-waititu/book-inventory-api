import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author) private authorRepository:Repository<Author>,
  ) {}
  async create(createAuthorDto: CreateAuthorDto) {
    return await this.authorRepository.save(createAuthorDto).then((author) => {
      return author;
    }).catch((error) => {
      throw new Error(`Error creating author: ${error.message}`);
    });
  }

  async findAll(search?: string,limit?:number):Promise<Author[] | string> {
    if (search) {
      return await this.authorRepository.find({
        where: { name: search },
        take: limit,
        relations: ['books'],
        order: {
          name: 'ASC',  
        },
      }).catch((error) => {
        throw new NotFoundException(`No authors found with name: ${search}`);

      });
    }
    return await this.authorRepository.find({
      take: limit,
      relations: ['books'],
      order: {
        name: 'ASC',  
      },
    }).catch((error) => {
      throw new NotFoundException(`No authors found: ${error.message}`);
      });
  }

  async findOne(id: string): Promise<Author | string> {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    return author;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.authorRepository.preload({
      id: id,
      ...updateAuthorDto,
    });
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    return this.authorRepository.save(author);
  }

  async remove(id: number): Promise<void> {
    const author = await this.authorRepository.findOne({ where: { id: id.toString() } });
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    await this.authorRepository.remove(author);
  }
}
