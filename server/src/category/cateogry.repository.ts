import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async allCategory(): Promise<Category[]> {
    const result = await this.find();
    return result;
  }
}
