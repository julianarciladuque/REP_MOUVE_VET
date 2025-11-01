import { Test, TestingModule } from '@nestjs/testing';
import { CareServiceController } from './care-service.controller';
import { CareServiceService } from './care-service.service';

describe('CareServiceController', () => {
  let careServiceController: CareServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CareServiceController],
      providers: [CareServiceService],
    }).compile();

    careServiceController = app.get<CareServiceController>(CareServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(careServiceController.getHello()).toBe('Hello World!');
    });
  });
});
