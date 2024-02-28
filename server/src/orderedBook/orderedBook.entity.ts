import { Book } from 'src/book/book.entity';
import { Order } from 'src/order/order.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orderedBook' })
export class OrderedBook extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, { eager: true })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Book, { eager: true })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column({ type: 'integer', nullable: false })
  quantity: number;
}
