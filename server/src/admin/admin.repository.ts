import { Injectable } from '@nestjs/common';
import { Book } from 'src/book/book.entity';
import { DataSource, Repository } from 'typeorm';
import { BookRequestDto } from './dto/book-request.dto';

@Injectable()
export class AdminRepository extends Repository<Book> {
  constructor(dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  async createBook(bookRequestDto: BookRequestDto): Promise<void> {
    const {
      title,
      category_id,
      form,
      isbn,
      summary,
      detail,
      author,
      pages,
      contents,
      price,
      pub_date,
    } = bookRequestDto;
    const book = this.create({
      title,
      category_id,
      form,
      isbn,
      summary,
      detail,
      author,
      pages,
      contents,
      price,
      pub_date,
    });
    try {
      await this.save(book);
    } catch (error) {
      console.log(error);
    }
  }
}
