import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { BookAllDto } from './dto/book-all.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,
  ) {}
  async getBooks(bookAllDto: BookAllDto): Promise<object> {
    return this.bookRepository.allBook(bookAllDto);
  }
  async getDetail(bookId: number, userId?: number) {
    return this.bookRepository.getDetail(bookId, userId);
  }
}
