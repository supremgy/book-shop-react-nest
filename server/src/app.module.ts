import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeORMConfig } from './config/typeorm.config';
import { BookModule } from './book/book.module';
import { AdminModule } from './admin/admin.module';
import { LikeModule } from './like/like.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    BookModule,
    AdminModule,
    LikeModule,
    CartModule,
    CategoryModule,
    OrderModule,
  ],
})
export class AppModule {}
