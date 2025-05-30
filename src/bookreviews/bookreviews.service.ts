import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookreviewDto } from './dto/create-bookreview.dto';
import { UpdateBookreviewDto } from './dto/update-bookreview.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookReview } from './entities/bookreview.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookreviewsService {
   constructor(
      @InjectRepository(BookReview) private bookReviewRepository:Repository<BookReview>,
    ) {}
  async create(createBookreviewDto: CreateBookreviewDto) {
    return await this.bookReviewRepository.save(createBookreviewDto).then((bookReview) => {
      return bookReview;
    }).catch((error) => {
      throw new Error(`Error creating book review: ${error.message}`);
    });
  }

  async findAll(): Promise<BookReview[] | string> {
    return await this.bookReviewRepository.find({
      relations: {
        book: true
      },
      order: {
        createdAt: 'DESC',  
      },
    }).catch((error) => {
      throw new NotFoundException(`Error fetching book reviews: ${error.message}`);
    });
  }

  async findOne(id: string): Promise<BookReview | string> {
    return await this.bookReviewRepository.findOne({
      where: { id },
      relations: ['book', 'user'],
    }).then((bookReview) => {
      if (!bookReview) {
        throw new NotFoundException(`Book review with id ${id} not found`);
      }
      return bookReview;
    }).catch((error) => {
      throw new NotFoundException(`Error fetching book review: ${error.message}`);
    });
  }

  async update(id: string, updateBookreviewDto: UpdateBookreviewDto): Promise<BookReview | string> {
    return await this.bookReviewRepository.findOne({ where: { id } })
      .then(async (bookReview) => {
        if (!bookReview) {
          throw new Error(`Book review with id ${id} not found`);
        }
        const updatedBookReview = Object.assign(bookReview, updateBookreviewDto);
        return await this.bookReviewRepository.save(updatedBookReview);
      }).catch((error) => {
        throw new Error(`Error updating book review: ${error.message}`);
      });
  }

  async remove(id: number): Promise<{ message: string } | string> {
    return await this.bookReviewRepository.delete(id).then((result) => {
      if (result.affected === 0) {
        throw new Error(`Book review with id ${id} not found`);
      }
      return { message: `Book review with id ${id} deleted successfully` };
    }).catch((error) => {
      throw new Error(`Error deleting book review: ${error.message}`);
    });
  }
}
