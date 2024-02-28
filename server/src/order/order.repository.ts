import { OrderedBookRepository } from './../orderedBook/orderedBook.repository';
import { CartRepository } from './../cart/cart.repository';
import { Injectable } from '@nestjs/common';
import { DataSource, InsertResult, Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderRequestDto } from './dto/order-request.dto';
import { DeliveryRepository } from 'src/delivery/delivery.repository';
import { OrderedBookRequestDTO } from 'src/orderedBook/dto/orderedBook-request.dto';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(
    dataSource: DataSource,
    private readonly deliveryRepository: DeliveryRepository,
    private readonly cartRepository: CartRepository,
    private readonly orderedBookRepository: OrderedBookRepository,
  ) {
    super(Order, dataSource.createEntityManager());
  }

  async orderBooks(orderRequestDto: OrderRequestDto) {
    const {
      items,
      delivery,
      firstBookTitle,
      totalQuantity,
      totalPrice,
      userId,
    } = orderRequestDto;
    const orderDeliveryResult: InsertResult =
      await this.deliveryRepository.createDelivery(delivery);
    const deliveryId = orderDeliveryResult.identifiers[0].id;

    const orderResult: InsertResult = await this.createQueryBuilder()
      .insert()
      .into(Order)
      .values({
        bookTitle: firstBookTitle,
        totalQuantity,
        totalPrice,
        user: { id: userId },
        delivery: { id: deliveryId },
      })
      .execute();
    const orderId = orderResult.identifiers[0].id;

    const cartItems = await this.cartRepository.selectCartItem(items);
    let orderItems: OrderedBookRequestDTO[] = [];
    cartItems.forEach((item) => {
      orderItems.push({
        orderId: orderId,
        bookId: item.book_id,
        quantity: item.quantity,
      });
    });

    await this.orderedBookRepository.createOrderedBook(orderItems);
    const result = await this.cartRepository.deleteCartItem(items);
    return result;
  }

  async getOrders() {
    const result = await this.createQueryBuilder('order')
      .select([
        'order.id',
        'order.created_at',
        'order.book_title',
        'order.total_quantity',
        'order.total_price',
        'delivery.address AS address',
        'delivery.receiver AS receiver',
        'delivery.contact AS contact',
      ])
      .leftJoin('order.delivery', 'delivery')
      .getRawMany();
    return result;
  }
}
