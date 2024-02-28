import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { OrderRequestDto } from './dto/order-request.dto';
import { OrderedBookRepository } from 'src/orderedBook/orderedBook.repository';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    @InjectRepository(OrderedBookRepository)
    private orderedBookRepository: OrderedBookRepository,
  ) {}

  orderBooks(orderRequestDto: OrderRequestDto) {
    return this.orderRepository.orderBooks(orderRequestDto);
  }
  getOrders() {
    return this.orderRepository.getOrders();
  }
  getOrderDetail(orderId: number) {
    // return this.orderRepository.getOrderDetail(orderId);
    return this.orderedBookRepository.getOrderDetail(orderId);
  }
}
