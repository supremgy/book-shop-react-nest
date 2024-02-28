import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { OrderedBook } from './orderedBook.entity';
import { OrderedBookRequestDTO } from './dto/orderedBook-request.dto';

@Injectable()
export class OrderedBookRepository extends Repository<OrderedBook> {
  constructor(dataSource: DataSource) {
    super(OrderedBook, dataSource.createEntityManager());
  }

  async createOrderedBook(cartItems: OrderedBookRequestDTO[]) {
    try {
      for (const item of cartItems) {
        const { orderId, bookId, quantity } = item;

        await this.createQueryBuilder()
          .insert()
          .into(OrderedBook)
          .values({
            order: { id: orderId },
            book: { id: bookId },
            quantity,
          })
          .execute();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getOrderDetail(orderId: number) {
    const result = await this.createQueryBuilder('orderedBook')
      .select([
        'orderedBook.book_id',
        'orderedBook.quantity as quantity',
        'book.title as title',
        'book.author as author',
        'book.price as price',
      ])
      .leftJoin('orderedBook.book', 'book')
      .where('orderedBook.order_id = :orderId', { orderId })
      .getRawMany();
    return result;
  }
}
