import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class OrderDeliveryDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  receiver: string;

  @IsNotEmpty()
  @IsString()
  contact: string;
}

export class OrderRequestDto {
  @IsArray()
  @IsInt({ each: true })
  items: number[];

  @ValidateNested()
  @Type(() => OrderDeliveryDto)
  delivery: OrderDeliveryDto;

  @IsNotEmpty()
  @IsString()
  firstBookTitle: string;

  @IsNotEmpty()
  @IsInt()
  totalQuantity: number;

  @IsNotEmpty()
  @IsInt()
  totalPrice: number;

  userId: number;
}
