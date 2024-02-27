import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookFormStatus } from './book-status.enum';
import { Category } from 'src/category/category.entity';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  // @Column()
  //     img:string

  @Column({ name: 'category_id', type: 'integer', nullable: false })
  categoryId: number;

  @Column({ type: 'varchar', nullable: false })
  form: BookFormStatus;

  @Column({ type: 'varchar', nullable: false, unique: true })
  isbn: string;

  @Column({ type: 'character varying', length: 500, default: null })
  summary: string;

  @Column({ type: 'text', default: null })
  detail: string;

  @Column({ type: 'varchar', default: null })
  author: string;

  @Column({ type: 'integer', nullable: false })
  pages: number;

  @Column({ type: 'text', default: null })
  contents: string;

  @Column({ type: 'integer', nullable: false })
  price: number;

  @Column({ name: 'pub_date', type: 'date', default: null })
  pubDate: string;

  @OneToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'id' })
  category: Category;
}
