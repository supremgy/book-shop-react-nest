import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartRepository } from './cart.repository';
import { CartCreateDto } from './dto/cart-create.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartRepository)
    private cartRepository: CartRepository,
  ) {}

  async addToCart(userId: number, cartCreateDto: CartCreateDto) {
    return this.cartRepository.addToCart(userId, cartCreateDto);
  }
  async getCartItem(userId: number, selected?: number[]) {
    return this.cartRepository.getCartItem(userId, selected);
  }
}
