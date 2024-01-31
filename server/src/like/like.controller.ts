import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { LikeService } from './like.service';

@Controller('like')
@UseGuards(AuthGuard())
export class LikeController {
  constructor(private likeService: LikeService) {}
  @Post('/:id')
  addLike(@Param('id') liked_book_id: number, @GetUser() user: User) {
    return this.likeService.addLike(user.id, liked_book_id);
  }
}
