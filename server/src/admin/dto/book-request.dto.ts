import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { BookFormStatus } from '../../book/book-status.enum';

export class BookRequestDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsNotEmpty()
  @IsEnum(BookFormStatus)
  form: BookFormStatus;

  @IsNotEmpty()
  @IsString()
  isbn: string;

  @IsString()
  summary: string;

  @IsString()
  detail: string;

  @IsString()
  author: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  pages: number;

  @IsString()
  contents: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsDateString()
  pubDate: string;
}
