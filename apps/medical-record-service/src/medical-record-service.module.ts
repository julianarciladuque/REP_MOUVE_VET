import { Module } from '@nestjs/common';
import { MedicalRecordServiceController } from './medical-record-service.controller';
import { MedicalRecordServiceService } from './medical-record-service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientInfoSchema } from './schemas/patientInfo.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@localhost:27017/', {
      dbName: 'local',
    }),
    MongooseModule.forFeature([{ name: 'PatientInfo', schema: PatientInfoSchema , collection: 'patient-info'}]),
  ],
  controllers: [MedicalRecordServiceController],
  providers: [MedicalRecordServiceService],
})
export class MedicalRecordServiceModule {}
