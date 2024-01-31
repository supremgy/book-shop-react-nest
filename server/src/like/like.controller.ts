import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { LikeService } from './like.service';

@Controller('like')
@UseGuards(AuthGuard())
export class LikeController {
  constructor(private likeService: LikeService) {}
  @Post('/:id')
  addLike(@Param('id', ParseIntPipe) liked_book_id, @GetUser() user: User) {
    return this.likeService.addLike(user.id, liked_book_id);
  }
  @Delete('/:id')
  deleteLike(@Param('id', ParseIntPipe) liked_book_id, @GetUser() user: User) {
    return this.likeService.deleteLike(user.id, liked_book_id);
  }
}
