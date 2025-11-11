import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vital } from './vitals/vital.entity';
import { Attention } from './attentions/attention.entity';
import { VitalsModule } from './vitals/vitals.module';
import { AttentionsModule } from './attentions/attentions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5431,
      username: 'postgres',
      password: '123456789',
      database: 'postgres',
      entities: [Vital, Attention],
      synchronize: true, // ⚠️ solo para desarrollo
    }),
    VitalsModule,
    AttentionsModule,
  ],
})
export class CareServiceModule {}
