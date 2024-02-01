import { LikeRepository } from './../like/like.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookRepository]),
    TypeOrmModule.forFeature([LikeRepository]),
  ],
  controllers: [BookController],
  providers: [BookService, BookRepository, LikeRepository],
})
export class BookModule {}
