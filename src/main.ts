import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ValidationPipe global: DTO divalidasi otomatis di semua endpoint
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // buang field yang tidak ada di DTO
      forbidNonWhitelisted: true, // tolak field asing
      transform: true,
    }),
  );

  // Izinkan frontend Vite memanggil API ini
  app.enableCors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
