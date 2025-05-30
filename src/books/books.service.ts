import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
        @InjectRepository(Book) private bookRepository:Repository<Book>,
      ) {}
  async create(createBookDto: CreateBookDto): Promise<Book> {
    return await this.bookRepository.save(createBookDto).then((book) => {
      return book;
    }).catch((error) => {
      throw new Error(`Error creating book: ${error.message}`);
    });
  
  }

  async findAll(search?: string, limit?: number): Promise<Book[] | string> {
    if (search) {
      return await this.bookRepository.find({
        where: [
          { title: search },
          { author: { name: search } },
          { categories: { name: search } }
        ],
        take: limit,
        relations: ['author', 'category'],
        order: {
          title: 'ASC',
        },
            }).catch((error) => {
        throw new NotFoundException(`No books found with title: ${search}`);
      });
    }
    return await this.bookRepository.find({
      take: limit,
      relations: ['author', 'categories'],
      order: {title: 'ASC',
      },
    }).catch((error) => {
      throw new NotFoundException(`No books found: ${error.message}`);
    });
  }

  async findOne(id: string): Promise<Book | string> {
    return await this.bookRepository.findOne({
      where: { id },
      relations: ['author', 'categories', 'reviews'],
    }).then((book) => {
      if (!book) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }
      return book;
    }).catch((error) => { 
      throw new NotFoundException(`Error fetching book: ${error.message}`);
    });
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book | string> {
    return await this.bookRepository.findOne({ where: { id } }).then(async (book) => {
      if (!book) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }
      Object.assign(book, updateBookDto);
      return await this.bookRepository.save(book).then((updatedBook) => {
        return updatedBook;
      }).catch((error) => {
        throw new Error(`Error updating book: ${error.message}`);
      });
    }).catch((error) => {
      throw new NotFoundException(`Error fetching book for update: ${error.message}`);
    }); 
  }

  async remove(id: string): Promise<{ message: string } | string> {
    return await this.bookRepository.findOne({ where: { id } }).then(async (book) => {
      if (!book) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }
      await this.bookRepository.remove(book);
      return { message: `Book with id ${id} deleted successfully` };
    }).catch((error) => {
      throw new NotFoundException(`Error deleting book: ${error.message}`);
    });
  }
}
