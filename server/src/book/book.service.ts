import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookRepository } from './book.repository';
import { BookAllDto } from './dto/book-all.dto';

@Injectable()
export class BookService {
  //   constructor(
  //     @InjectRepository(BookRepository)
  //     private bookRepository: BookRepository,
  //   ) {}
  //   async getBooks(bookAllDto: BookAllDto): Promise<Book[]> {
  //     const { category_id, news, limit, currentPage } = bookAllDto;
  //     const query = this.bookRepository.createQueryBuilder('book');
  //     //카테고리별 신상조회
  //     if (category_id && news) {
  //       return this.bookRepository.latestBooksByCategory(bookAllDto);
  //       //카테고리별 전체조회
  //     } else if (category_id) {
  //       return this.bookRepository.booksByCategory(bookAllDto);
  //       //신상 전체조회
  //     } else if (news) {
  //       return this.bookRepository.latestBooks(bookAllDto);
  //     }
  //     //전체조회
  //     query.where();
  //     return this.bookRepository.find();
  //   }
}
