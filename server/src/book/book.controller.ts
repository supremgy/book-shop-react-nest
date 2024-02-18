import { BookService } from './book.service';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { BookAllDto } from './dto/book-all.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('/')
  getBooks(@Query(ValidationPipe) bookAllDto: BookAllDto) {
    return this.bookService.getBooks(bookAllDto);
  }

  @Get('/detail/:id')
  @UseGuards(AuthGuard())
  getBookDetail(@Param('id', ParseIntPipe) bookId, @GetUser() user: User) {
    return this.bookService.getDetail(bookId, user.id);
  }
}
