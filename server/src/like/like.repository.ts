import { DataSource, Repository } from 'typeorm';
import { Like } from './like.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LikeRepository extends Repository<Like> {
  constructor(dataSource: DataSource) {
    super(Like, dataSource.createEntityManager());
  }
  async addLike(user_id: number, liked_book_id: number): Promise<void> {
    const like = this.create({
      user: { id: user_id },
      likedBook: { id: liked_book_id },
    });
    try {
      await this.save(like);
    } catch (error) {
      console.log(error);
    }
  }
}
