import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ✅ Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Care Service API')
    .setDescription('Documentación de los endpoints del microservicio de enfermería')
    .setVersion('1.0')
    .addBearerAuth() // Si usas JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // ✅ Puerto corregido (usa PORT en mayúsculas y valor por defecto)
  const port = process.env.PORT || 3006;
  await app.listen(port);

  console.log(`🚀 Care Service corriendo en http://localhost:${port}`);
  console.log(`📘 Swagger disponible en http://localhost:${port}/api-docs`);
}
bootstrap();
