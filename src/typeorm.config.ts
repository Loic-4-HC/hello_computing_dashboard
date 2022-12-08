import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgresmaster',
  database: process.env.POSTGRES_DB || 'postgres',
  //   entities: [Permission],
  entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
  synchronize: true,
  autoLoadEntities: true,
};
