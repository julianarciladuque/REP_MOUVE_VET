import { Test, TestingModule } from '@nestjs/testing';
import { MedicalRecordServiceController } from './medical-record-service.controller';
import { MedicalRecordServiceService } from './medical-record-service.service';

describe('MedicalRecordServiceController', () => {
  let medicalRecordServiceController: MedicalRecordServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MedicalRecordServiceController],
      providers: [MedicalRecordServiceService],
    }).compile();

    medicalRecordServiceController = app.get<MedicalRecordServiceController>(MedicalRecordServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(medicalRecordServiceController.getHello()).toBe('Hello World!');
    });
  });
});
