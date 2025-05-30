import { IsNotEmpty, IsOptional, IsString, Length, IsDateString } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  name: string;

  @IsOptional()
  @IsString()
  @Length(0, 1000)
  bio?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;
}

