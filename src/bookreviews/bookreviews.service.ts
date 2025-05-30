import { Injectable } from '@nestjs/common';
import { CreateBookreviewDto } from './dto/create-bookreview.dto';
import { UpdateBookreviewDto } from './dto/update-bookreview.dto';

@Injectable()
export class BookreviewsService {
  create(createBookreviewDto: CreateBookreviewDto) {
    return 'This action adds a new bookreview';
  }

  findAll() {
    return `This action returns all bookreviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookreview`;
  }

  update(id: number, updateBookreviewDto: UpdateBookreviewDto) {
    return `This action updates a #${id} bookreview`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookreview`;
  }
}
