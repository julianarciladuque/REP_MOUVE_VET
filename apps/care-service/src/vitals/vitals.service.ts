import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vital } from './vital.entity';
import { CreateVitalDto } from './dto/create-vital.dto';

@Injectable()
export class VitalsService {
  constructor(
    @InjectRepository(Vital)
    private readonly vitalRepo: Repository<Vital>,
  ) {}

  create(dto: CreateVitalDto) {
    const record = this.vitalRepo.create(dto);
    return this.vitalRepo.save(record);
  }

  findAll() {
    return this.vitalRepo.find();
  }

  async findByPatient(patientid: number) {
    const vitals = await this.vitalRepo.find({ where: { patientid } });
    if (!vitals.length) throw new NotFoundException('No se encontraron registros de signos vitales.');
    return vitals;
  }
}
