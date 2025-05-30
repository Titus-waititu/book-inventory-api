import { IsNotEmpty, IsString, Length, IsInt, Min, Max, IsUUID } from 'class-validator';

export class CreateBookreviewDto {
  @IsNotEmpty()
  @IsString()
  @Length(10, 1000)
  content: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

 
}
