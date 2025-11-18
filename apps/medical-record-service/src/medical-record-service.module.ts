import { Module } from '@nestjs/common';
import { MedicalRecordServiceController } from './medical-record-service.controller';
import { MedicalRecordServiceService } from './medical-record-service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'apps/login-service/src/strategies/jwt.strategy';
import { PatientInfoSchema } from './schemas/patientInfo.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medication } from 'apps/inventory-service/src/medications/medication.entity';
import { Procedure } from 'apps/inventory-service/src/procedures/procedure.entity';
import { Diagnostic } from 'apps/inventory-service/src/diagnostics/diagnostics.entity';
import { Order } from './entity/order.entityt';
import { HttpModule } from '@nestjs/axios';
import { PatientClient } from './clients/patient-client';
import { InventoryClient } from './inventory/inventory.client';
import { OrderItem } from './entity/order-item.entity';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@localhost:27017/', {
      dbName: 'local',
    }),
    MongooseModule.forFeature([{ name: 'PatientInfo', schema: PatientInfoSchema, collection: 'patient_infos' }]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5431,
      username: 'postgres',
      password: '123456789',
      database: 'postgres',
      entities: [Medication, Procedure, Diagnostic, Order, OrderItem],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Medication, Procedure, Diagnostic, Order,OrderItem]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    })
  ],
  controllers: [MedicalRecordServiceController],
  providers: [MedicalRecordServiceService, JwtStrategy, PatientClient, InventoryClient],
})
export class MedicalRecordServiceModule { }
