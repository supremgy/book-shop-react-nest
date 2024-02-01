import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
export class BookAllDto {
  @Type(() => Number)
  category_id?: number;

  @Type(() => Boolean)
  news?: boolean;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  limit: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @Min(1, { message: 'currentPage must be greater than or equal to 1' })
  currentPage: number;
}
