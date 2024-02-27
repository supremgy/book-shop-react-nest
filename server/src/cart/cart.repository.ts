import { Injectable } from '@nestjs/common';
import { Cart } from './cart.entity';
import { DataSource, Repository } from 'typeorm';
import { CartCreateDto } from './dto/cart-create.dto';

@Injectable()
export class CartRepository extends Repository<Cart> {
  constructor(dataSource: DataSource) {
    super(Cart, dataSource.createEntityManager());
  }

  async addToCart(userId: number, cartCreateDto: CartCreateDto): Promise<void> {
    const { bookId, quantity } = cartCreateDto;

    const cart = this.create({
      bookId,
      quantity,
      userId,
    });
    try {
      await this.save(cart);
    } catch (error) {
      console.log(error);
    }
  }
}
