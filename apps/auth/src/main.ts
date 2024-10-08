import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { AUTH_SERVICE, RmqService } from '@app/common';
import { RmqOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.useGlobalPipes(new ValidationPipe());

  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice<RmqOptions>(
    rmqService.getOptions(AUTH_SERVICE, true),
  );
  await app.startAllMicroservices();

  const configService = app.get(ConfigService);
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
