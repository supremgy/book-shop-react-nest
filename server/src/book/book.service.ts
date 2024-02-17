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
    // const { categoryId, news } = bookAllDto;

    //카테고리별 신상조회
    // if (categoryId && news) {
    //   return this.bookRepository.latestBooksByCategory(bookAllDto);
    //   //카테고리별 전체조회
    // }
    // else if (category_id) {
    //   return this.bookRepository.booksByCategory(bookAllDto);
    //   //신상 전체조회
    // } else if (news) {
    //   return this.bookRepository.latestBooks(bookAllDto);
    // }

    //전체조회
    return this.bookRepository.allBook(bookAllDto);
  }
}
