import { AdminService } from './admin.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { BookRequestDto } from './dto/book-request.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminservice: AdminService) {}
  @Post('/addbook')
  addBook(@Body(ValidationPipe) bookRequestDto: BookRequestDto): Promise<void> {
    return this.adminservice.addBook(bookRequestDto);
  }
}
