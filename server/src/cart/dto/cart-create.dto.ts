import { IsNotEmpty, IsNumber } from 'class-validator';

export class CartCreateDto {
  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
