import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Book } from 'src/books/entities/book.entity';

@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([Author,Book])], 
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
