import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Author } from 'src/authors/entities/author.entity';
import { Category } from 'src/categories/entities/category.entity';
import { BookReview } from 'src/bookreviews/entities/bookreview.entity';

@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([Book,Author,Category,BookReview])], 
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
