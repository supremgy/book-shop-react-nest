import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'BookShop-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};
