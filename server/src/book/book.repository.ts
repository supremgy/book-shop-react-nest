import { BookAllDto } from './dto/book-all.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Book } from './book.entity';
import { LikeRepository } from 'src/like/like.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(
    dataSource: DataSource,
    @InjectRepository(LikeRepository) private likeRepository: LikeRepository,
  ) {
    super(Book, dataSource.createEntityManager());
  }

  async allBook(bookAllDto: BookAllDto): Promise<Object> {
    let bookResult = {};
    const { limit, currentPage } = bookAllDto;

    //bookTotalCount
    const bookCount = await this.count();

    //totalPage
    let totalPage = Math.round(bookCount / limit);
    if (currentPage > totalPage) {
      throw new NotFoundException('currentPage가 totalPage보다 크다');
    }

    //모든 책 조회
    let offset = limit * (currentPage - 1);
    const books = await this.find({ take: limit, skip: offset });

    // likes 추가
    const likesResult = await Promise.all(
      books.map(async (book) => {
        const likes = await this.likeRepository
          .createQueryBuilder('like')
          .where('like.liked_book_id = :liked_book_id', {
            liked_book_id: book.id,
          })
          .getCount();

        return {
          ...book,
          likes: likes,
        };
      }),
    );
    bookResult = {
      books: likesResult,
      pagination: { currentPage, totalPage, totalCount: bookCount },
    };
    return bookResult;
  }

  async latestBooksByCategory(bookAllDto: BookAllDto): Promise<Book> {
    const { categoryId, news, limit, currentPage } = bookAllDto;

    return;
  }
  async booksByCategory(bookAllDto: BookAllDto): Promise<Book> {
    return;
  }
  async latestBooks(bookAllDto: BookAllDto): Promise<Book> {
    return;
  }
}
