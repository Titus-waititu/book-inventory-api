import { PartialType } from '@nestjs/mapped-types';
import { CreateBookreviewDto } from './create-bookreview.dto';

export class UpdateBookreviewDto extends PartialType(CreateBookreviewDto) {}
