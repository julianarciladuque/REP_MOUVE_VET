import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { Billing } from './entities/billing.entity';
import { CopayHistory } from './entities/copay-history.entity';
import { Patient } from '../entities/patient.entity';
import { OrderClient } from '../clients/order-client';

@Module({
  imports: [
    TypeOrmModule.forFeature([Billing, CopayHistory, Patient]),
    HttpModule,
  ],
  controllers: [BillingController],
  providers: [BillingService,OrderClient],
})
export class BillingModule {}
