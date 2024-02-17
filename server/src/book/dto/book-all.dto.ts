import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';
export class BookAllDto {
  @Type(() => Number)
  categoryId?: number;

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
