import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { OrderRequestDto } from './dto/order-request.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
  ) {}

  orderBooks(orderRequestDto: OrderRequestDto) {
    return this.orderRepository.orderBooks(orderRequestDto);
  }
}
