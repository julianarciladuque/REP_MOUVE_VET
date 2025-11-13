import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagnostic } from './diagnostics.entity';
import { DiagnosticController } from './diagnostics.controller';
import { DiagnosticService } from './diagnostics.service';
import { JwtStrategy } from 'apps/login-service/src/strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Diagnostic])],
  controllers: [DiagnosticController],
  providers: [DiagnosticService,JwtStrategy],
})
export class DiagnosticModule {}
