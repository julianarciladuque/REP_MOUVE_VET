import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyContact } from './entities/emergency-contact.entity';
import { Insurance } from './entities/insurance.entity';
import { Patient } from './entities/patient.entity';

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
    TypeOrmModule.forFeature([EmergencyContact,Insurance,Patient]),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
