import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyContact } from './entities/emergency-contact.entity';
import { Insurance } from './entities/insurance.entity';
import { Patient } from './entities/patient.entity';
import { JwtStrategy } from 'apps/login-service/src/strategies/jwt.strategy';
import { LoginServiceModule } from 'apps/login-service/src/login-service.module';
import { BillingModule } from './billing/billing.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5431,
      username: 'postgres',
      password: '123456789',
      database: 'postgres',
      entities: [EmergencyContact,Insurance,Patient],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([EmergencyContact,Insurance,Patient]),
  LoginServiceModule,
  BillingModule],
  controllers: [AppController],
  providers: [AppService,JwtStrategy],
})
export class AppModule {}
