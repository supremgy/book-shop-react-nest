import { Like } from './../like/like.entity';
import { BookAllDto } from './dto/book-all.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  async allBook(bookAllDto: BookAllDto): Promise<object> {
    let bookResult = {};
    const { limit, currentPage } = bookAllDto;
    const offset = limit * (currentPage - 1);
    //bookTotalCount
    const bookCount = await this.count();

    //totalPage
    const totalPage = Math.round(bookCount / limit);
    if (currentPage > totalPage) {
      throw new NotFoundException('currentPage가 totalPage보다 크다');
    }
    const books = await this.createQueryBuilder('book')
      .select('*')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(*)::int', 'likes') // 문자열로 반환되는 이슈 https://github.com/typeorm/typeorm/issues/6196
          .from(Like, 'like')
          .where('like.liked_book_id = book.id');
      }, 'likes')
      .offset(offset)
      .limit(4)
      .getRawMany<{ likes: number }>();
    bookResult = {
      books,
      pagination: { currentPage, totalPage },
    };
    return bookResult;
  }

  // async latestBooksByCategory(bookAllDto: BookAllDto): Promise<Book> {
  //   const { categoryId, news, limit, currentPage } = bookAllDto;

  //   return;
  // }
  // async booksByCategory(bookAllDto: BookAllDto): Promise<Book> {
  //   return;
  // }
  // async latestBooks(bookAllDto: BookAllDto): Promise<Book> {
  //   return;
  // }
}
