import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';
import { BookreviewsModule } from './bookreviews/bookreviews.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UsersModule,
    ProfilesModule,
    AuthorsModule,
    BooksModule,
    CategoriesModule,
    BookreviewsModule,
    DatabaseModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
