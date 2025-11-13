import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vital } from './vital.entity';
import { VitalsController } from './vitals.controller';
import { VitalsService } from './vitals.service';
import { JwtStrategy } from 'apps/login-service/src/strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Vital])],
  controllers: [VitalsController],
  providers: [VitalsService,JwtStrategy],
})
export class VitalsModule {}
