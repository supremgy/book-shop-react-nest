import { IsInt, IsNotEmpty } from 'class-validator';

export class OrderedBookRequestDTO {
  @IsNotEmpty()
  @IsInt()
  orderId: number;

  @IsNotEmpty()
  @IsInt()
  bookId: number;

  @IsNotEmpty()
  @IsInt()
  quantity: number;
}
