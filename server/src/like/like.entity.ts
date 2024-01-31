import { User } from 'src/auth/user.entity';
import { Book } from 'src/book/book.entity';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'liked_book_id' })
  likedBook: Book;
}
