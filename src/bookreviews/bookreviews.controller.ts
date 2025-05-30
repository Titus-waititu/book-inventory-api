import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookreviewsService } from './bookreviews.service';
import { CreateBookreviewDto } from './dto/create-bookreview.dto';
import { UpdateBookreviewDto } from './dto/update-bookreview.dto';

@Controller('bookreviews')
export class BookreviewsController {
  constructor(private readonly bookreviewsService: BookreviewsService) {}

  @Post()
  create(@Body() createBookreviewDto: CreateBookreviewDto) {
    return this.bookreviewsService.create(createBookreviewDto);
  }

  @Get()
  findAll() {
    return this.bookreviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookreviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookreviewDto: UpdateBookreviewDto) {
    return this.bookreviewsService.update(+id, updateBookreviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookreviewsService.remove(+id);
  }
}
