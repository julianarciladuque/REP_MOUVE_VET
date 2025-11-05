import { Controller, Get, UseGuards } from '@nestjs/common';
import { MedicalRecordServiceService } from './medical-record-service.service';
import { PatientInfo } from './schemas/patientInfo.schema';
import { JwtAuthGuard } from 'apps/login-service/src/guards/jwt.guard';

@Controller()
export class MedicalRecordServiceController {
  constructor(private readonly medicalRecordServiceService: MedicalRecordServiceService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getPatients(): Promise<PatientInfo[]> {
    return this.medicalRecordServiceService.getPatients();
  }
}
