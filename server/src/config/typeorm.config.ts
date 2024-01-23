import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'BookShop-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
