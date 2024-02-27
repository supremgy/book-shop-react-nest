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
    const { limit, currentPage, categoryId, news } = bookAllDto;

    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    const nowDate = new Date();

    const offset = limit * (currentPage - 1);

    let qb = this.createQueryBuilder('book')
      .select('*')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(*)::int', 'likes') // 문자열로 반환되는 이슈 https://github.com/typeorm/typeorm/issues/6196
          .from(Like, 'like')
          .where('like.liked_book_id = book.id');
      }, 'likes');

    //카테고리별 신상품 조회
    if (categoryId && news) {
      qb.andWhere('book.category_id = :CategoryId', {
        CategoryId: categoryId,
      }).andWhere('book.pub_date BETWEEN :startDate AND :endDate', {
        startDate: startDate,
        endDate: nowDate,
      });
      //신상품 조회
    } else if (news) {
      qb.andWhere('book.pub_date BETWEEN :startDate AND :endDate', {
        startDate: startDate,
        endDate: nowDate,
      });
      //카테고리별 조회
    } else if (categoryId) {
      qb.andWhere('book.category_id = :CategoryId', {
        CategoryId: categoryId,
      });
    }
    const count = await qb.getCount();
    const totalPage = Math.ceil(count / limit);
    if (currentPage > totalPage) {
      throw new NotFoundException('currentPage가 totalPage보다 크다');
    }
    const books = await qb.offset(offset).limit(4).getRawMany();
    bookResult = {
      books,
      pagination: { currentPage, totalPage },
    };
    return bookResult;
  }
  async getDetail(bookId: number, userId?: number): Promise<object> {
    let qb = this.createQueryBuilder('book')
      .select(['book.*', 'category.name'])
      .innerJoin('book.category', 'category')
      .where('book.id= :bookId', { bookId })
      .addSelect((sq) => {
        return sq
          .select('COUNT(*)::int', 'likes')
          .from(Like, 'like')
          .where('like.liked_book_id = book.id');
      }, 'likes');
    if (userId) {
      qb.addSelect((sq) => {
        return sq
          .select('COUNT(*)::int', 'liked')
          .from(Like, 'like')
          .where('like.liked_book_id = :bookId', { bookId })
          .andWhere('like.user_id = :userId', { userId });
      }, 'liked');
    }

    const result = await qb.getRawOne();
    if (!result) {
      throw new NotFoundException('책 정보가 없습니다.');
    }
    return result;
  }
}
