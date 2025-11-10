import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procedure } from './procedure.entity';
import { ProcedureController } from './procedures.controller';
import { ProcedureService } from './procedures.service';

@Module({
  imports: [TypeOrmModule.forFeature([Procedure])],
  controllers: [ProcedureController],
  providers: [ProcedureService],
})
export class ProcedureModule {}
