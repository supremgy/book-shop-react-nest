import { BookAllDto } from './dto/book-all.dto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  async allBook(bookAllDto: BookAllDto): Promise<Book> {
    return;
  }
  async latestBooksByCategory(bookAllDto: BookAllDto): Promise<Book> {
    return;
  }
  async booksByCategory(bookAllDto: BookAllDto): Promise<Book> {
    return;
  }
  async latestBooks(bookAllDto: BookAllDto): Promise<Book> {
    return;
  }
}
