import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { DeliveryRepository } from 'src/delivery/delivery.repository';
import { CartRepository } from 'src/cart/cart.repository';
import { OrderedBookRepository } from 'src/orderedBook/orderedBook.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository]),
    TypeOrmModule.forFeature([DeliveryRepository]),
    TypeOrmModule.forFeature([CartRepository]),
    TypeOrmModule.forFeature([OrderedBookRepository]),
    AuthModule,
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    DeliveryRepository,
    CartRepository,
    OrderedBookRepository,
  ],
})
export class OrderModule {}
