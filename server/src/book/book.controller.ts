import { BookService } from './book.service';
import {
  Controller,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { BookAllDto } from './dto/book-all.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('book')
export class BookController {
  constructor(
    private bookService: BookService,
    private authService: AuthService,
  ) {}

  @Get('/')
  getBooks(@Query(ValidationPipe) bookAllDto: BookAllDto) {
    return this.bookService.getBooks(bookAllDto);
  }

  @Get('/detail/:id')
  getBookDetail(
    @Param('id', ParseIntPipe) bookId,
    @Headers('authorization') authorization: string,
  ) {
    let token: string = '';
    let decoded;
    if (authorization) {
      token = authorization.replace('Bearer ', '');
      decoded = this.authService.decodedToken(token);
    }

    return this.bookService.getDetail(bookId, decoded?.id);
  }
}
