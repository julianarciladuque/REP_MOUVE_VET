import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PatientInfo } from './schemas/patientInfo.schema';

@Injectable()
export class MedicalRecordServiceService {
  constructor(@InjectModel(PatientInfo.name) private patientInfo: Model<PatientInfo>) { }

  async getPatients(): Promise<PatientInfo[]> {
    return this.patientInfo.find().exec();
  }
}
