import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/authors/entities/author.entity';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';
import { BookReview } from 'src/bookreviews/entities/bookreview.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Category } from 'src/categories/entities/category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        Author,User,Book,BookReview,Profile,Category
    ])],
     controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
