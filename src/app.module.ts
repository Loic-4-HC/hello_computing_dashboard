import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './typeorm.config';
import { PermissionModule } from './permission/permission.module';
import { LoggerModule } from 'nestjs-pino';
// import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    PermissionModule,
    LoggerModule.forRoot({
      pinoHttp: {
        name: 'HC-Dashboard',
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            colorized: true,
          },
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
