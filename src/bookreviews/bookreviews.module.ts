import { Module } from '@nestjs/common';
import { BookreviewsService } from './bookreviews.service';
import { BookreviewsController } from './bookreviews.controller';

@Module({
  controllers: [BookreviewsController],
  providers: [BookreviewsService],
})
export class BookreviewsModule {}
