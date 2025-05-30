import { IsNotEmpty, IsString, Length, IsNumber, Min, Max, IsBoolean, IsUUID } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 2000)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1000)
  @Max(new Date().getFullYear())
  publicationYear: number;

  @IsBoolean()
  isAvailable: boolean;

  @IsUUID()
  authorId: string;

  @IsNotEmpty()
  categoryIds: string[];
}