import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Medication } from './medication.entity';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';

@Injectable()
export class MedicationsService {
  constructor(
    @InjectRepository(Medication)
    private readonly repo: Repository<Medication>,
  ) {}

  async create(dto: CreateMedicationDto) {
    try {
      const med = this.repo.create(dto);
      return await this.repo.save(med);
    } catch (error) {
      if (error instanceof QueryFailedError && (error as any).code === '23505') {
        throw new BadRequestException('El medicamento ya existe.');
      }
      throw error;
    }
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const med = await this.repo.findOne({ where: { id } });
    if (!med) throw new NotFoundException('Medicamento no encontrado.');
    return med;
  }

  async update(id: number, dto: UpdateMedicationDto) {
    const med = await this.findOne(id);
    Object.assign(med, dto);
    return this.repo.save(med);
  }

  async remove(id: number) {
    const med = await this.findOne(id);
    await this.repo.remove(med);
    return { message: 'Medicamento eliminado correctamente' };
  }
}
