import { Controller, Get } from '@nestjs/common';
import { CareServiceService } from './care-service.service';

@Controller()
export class CareServiceController {
  constructor(private readonly careServiceService: CareServiceService) {}

  @Get()
  getHello(): string {
    return this.careServiceService.getHello();
  }
}
