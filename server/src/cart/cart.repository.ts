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
      book: { id: bookId },
      quantity,
      user: { id: userId },
    });
    try {
      await this.save(cart);
    } catch (error) {
      console.log(error);
    }
  }

  async getCartItem(userId: number, selected?: number[]) {
    console.log(selected);
    const query = this.createQueryBuilder('cart')
      .leftJoinAndSelect('cart.book', 'book')
      .select([
        'cart.id',
        'book.id',
        'book.title',
        'book.summary',
        'book.price',
        'cart.quantity',
      ])
      .where('cart.user_id = :userId', { userId });
    if (selected && selected.length > 0) {
      console.log(selected);
      query.andWhere('cart.id IN (:...selected)', { selected });
    }
    try {
      const cartItems = await query.getMany();
      return cartItems;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to get cart items');
    }
  }

  async removeCartItem(id: number, userId: number): Promise<void> {
    const cart = await this.findOne({
      where: { id: id, user: { id: userId } },
    });
    try {
      await this.remove(cart);
    } catch (error) {
      console.log(error);
    }
  }
}
