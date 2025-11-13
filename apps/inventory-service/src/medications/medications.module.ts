import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medication } from './medication.entity';
import { MedicationsController } from './medications.controller';
import { MedicationsService } from './medications.service';
import { JwtStrategy } from 'apps/login-service/src/strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Medication])],
  controllers: [MedicationsController],
  providers: [MedicationsService,JwtStrategy],
})
export class MedicationsModule {}
