import { NestFactory } from '@nestjs/core';
import { CareServiceModule } from './care-service.module';

async function bootstrap() {
  const app = await NestFactory.create(CareServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
