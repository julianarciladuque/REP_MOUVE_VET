import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medication } from './medications/medication.entity';
import { MedicationsModule } from './medications/medications.module';
import { ProcedureModule } from './procedures/procedure.module';
import { Procedure } from './procedures/procedure.entity';
import { Diagnostic } from './diagnostics/diagnostics.entity';
import { DiagnosticModule } from './diagnostics/diagnostics.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5431,
      username: 'postgres',
      password: '123456789',
      database: 'postgres',
      entities: [Medication,Procedure,Diagnostic],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Medication,Procedure,Diagnostic]),
  MedicationsModule,
  ProcedureModule,
  DiagnosticModule]
})
export class InventoryServiceModule {}
