import { NestFactory } from '@nestjs/core';
import { MedicalRecordServiceModule } from './medical-record-service.module';

async function bootstrap() {
  const app = await NestFactory.create(MedicalRecordServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
