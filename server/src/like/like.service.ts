import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeRepository)
    private likeRepository: LikeRepository,
  ) {}
  async addLike(user_id: number, liked_book_id: number): Promise<void> {
    return this.likeRepository.addLike(user_id, liked_book_id);
  }
  async deleteLike(user_id: number, liked_book_id: number): Promise<void> {
    return this.likeRepository.deleteLike(user_id, liked_book_id);
  }
}
