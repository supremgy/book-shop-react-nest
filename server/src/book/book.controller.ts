import { BookService } from './book.service';
import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { BookAllDto } from './dto/book-all.dto';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('/')
  getBooks(@Query(ValidationPipe) bookAllDto: BookAllDto) {
    return this.bookService.getBooks(bookAllDto);
  }
}
