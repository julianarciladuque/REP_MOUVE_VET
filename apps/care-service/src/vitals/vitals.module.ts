import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vital } from './vital.entity';
import { VitalsController } from './vitals.controller';
import { VitalsService } from './vitals.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vital])],
  controllers: [VitalsController],
  providers: [VitalsService],
})
export class VitalsModule {}
