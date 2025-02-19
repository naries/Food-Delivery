import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';

async function bootstrap() {
  console.log('nigga will get started');
  const app = await NestFactory.create(UsersModule);
  await app.listen(process.env.USER_PORT ?? 4002);
}
bootstrap();
