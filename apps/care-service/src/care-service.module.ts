import { Module } from '@nestjs/common';
import { CareServiceController } from './care-service.controller';
import { CareServiceService } from './care-service.service';

@Module({
  imports: [],
  controllers: [CareServiceController],
  providers: [CareServiceService],
})
export class CareServiceModule {}
