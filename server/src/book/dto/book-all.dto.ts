import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
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
  currentPage: number;
}
