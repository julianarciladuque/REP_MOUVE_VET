import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attention } from './attention.entity';
import { CreateAttentionDto } from './dto/create-attention.dto';

@Injectable()
export class AttentionsService {
  constructor(
    @InjectRepository(Attention)
    private readonly attentionRepo: Repository<Attention>,
  ) {}

  create(dto: CreateAttentionDto) {
    const attention = this.attentionRepo.create(dto);
    return this.attentionRepo.save(attention);
  }

  findAll() {
    return this.attentionRepo.find();
  }

  async findByPatient(patientid: number) {
    const attentions = await this.attentionRepo.find({ where: { patientid } });
    if (!attentions.length) throw new NotFoundException('No se encontraron atenciones para este paciente.');
    return attentions;
  }
}
