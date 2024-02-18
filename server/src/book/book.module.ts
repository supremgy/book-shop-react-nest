import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookRepository]), AuthModule],
  controllers: [BookController],
  providers: [BookService, BookRepository],
})
export class BookModule {}
