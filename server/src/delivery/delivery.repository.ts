import { Injectable } from '@nestjs/common';
import { DataSource, InsertResult, Repository } from 'typeorm';
import { Delivery } from './delivery.entity';
import { OrderDeliveryDto } from 'src/order/dto/order-request.dto';

@Injectable()
export class DeliveryRepository extends Repository<Delivery> {
  constructor(dataSource: DataSource) {
    super(Delivery, dataSource.createEntityManager());
  }
  async createDelivery(
    orderDliveryDto: OrderDeliveryDto,
  ): Promise<InsertResult> {
    const { address, receiver, contact } = orderDliveryDto;
    const result: InsertResult = await this.createQueryBuilder()
      .insert()
      .into(Delivery)
      .values({
        address,
        receiver,
        contact,
      })
      .execute();
    return result;
  }
}
