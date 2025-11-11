import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attention } from './attention.entity';
import { AttentionsController } from './attentions.controller';
import { AttentionsService } from './attentions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Attention])],
  controllers: [AttentionsController],
  providers: [AttentionsService],
})
export class AttentionsModule {}
