import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrderService } from './order.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { OrderRequestDto } from './dto/order-request.dto';
import { User } from 'src/auth/user.entity';
@Controller('order')
@UseGuards(AuthGuard())
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('/')
  order(
    @GetUser() user: User,
    @Body(ValidationPipe) orderRequestDto: OrderRequestDto,
  ) {
    orderRequestDto.userId = user.id;
    console.log(orderRequestDto);
    return this.orderService.orderBooks(orderRequestDto);
  }

  @Get('/')
  getOrders() {
    return this.orderService.getOrders();
  }

  @Get('/:id')
  getOrderDetail(@Param('id', ParseIntPipe) orderId: number) {
    return this.orderService.getOrderDetail(orderId);
  }
}
