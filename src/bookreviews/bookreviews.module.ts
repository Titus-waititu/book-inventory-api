import { Module } from '@nestjs/common';
import { BookreviewsService } from './bookreviews.service';
import { BookreviewsController } from './bookreviews.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookReview } from './entities/bookreview.entity';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';

@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([BookReview,User,Book])], 
  controllers: [BookreviewsController],
  providers: [BookreviewsService],
})
export class BookreviewsModule {}
