import { Controller, Get } from '@nestjs/common';
import { MedicalRecordServiceService } from './medical-record-service.service';
import { PatientInfo } from './schemas/patientInfo.schema';

@Controller()
export class MedicalRecordServiceController {
  constructor(private readonly medicalRecordServiceService: MedicalRecordServiceService) {}

  @Get()
  async getPatients(): Promise<PatientInfo[]> {
    return this.medicalRecordServiceService.getPatients();
  }
}
