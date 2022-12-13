import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('HELLO COMPUTING DASHBOARD')
    .setDescription('API developed for hello computing dashboard')
    .setVersion('1.0')
    .setExternalDoc(
      'http://localhost:3000/api-json',
      'http://localhost:3000/api-json',
    )
    .addOAuth2()
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
