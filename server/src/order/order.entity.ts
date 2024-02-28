import { User } from 'src/auth/user.entity';
import { Delivery } from 'src/delivery/delivery.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'order' })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  bookTitle: string;

  @Column({ type: 'integer' })
  totalQuantity: number;

  @Column({ type: 'integer' })
  totalPrice: number;

  @Column({ type: 'integer' })
  createdAt: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Delivery, { eager: true })
  @JoinColumn({ name: 'delivery_id' })
  delivery: Delivery;
}
