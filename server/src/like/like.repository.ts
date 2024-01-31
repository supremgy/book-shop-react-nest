import { DataSource, Repository } from 'typeorm';
import { Like } from './like.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

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

  async deleteLike(user_id: number, liked_book_id: number): Promise<void> {
    const result = await this.createQueryBuilder()
      .delete()
      .from(Like)
      .where('user_id = :user_id AND liked_book_id =:liked_book_id', {
        user_id,
        liked_book_id,
      })
      .execute();
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Book with id ${liked_book_id}`);
    }
  }
}
