import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CartCreateDto } from './dto/cart-create.dto';

@Controller('cart')
@UseGuards(AuthGuard())
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('/')
  addToCart(
    @GetUser() user: User,
    @Body(ValidationPipe) cartCreateDto: CartCreateDto,
  ): Promise<void> {
    return this.cartService.addToCart(user.id, cartCreateDto);
  }

  @Get('/')
  getCartItem(
    @GetUser() user: User,
    @Body() { selected }: { selected: number[] },
  ) {
    return this.cartService.getCartItem(user.id, selected);
  }

  @Delete('/:id')
  removeCartItem(@Param('id', ParseIntPipe) id, @GetUser() user: User) {
    return this.cartService.removeCartItem(id, user.id);
  }
}
