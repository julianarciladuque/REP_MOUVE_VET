import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Diagnostic } from './diagnostics.entity';
import { CreateDiagnosticDto } from './dtos/create-diagnostic.dto';
import { UpdateDiagnosticDto } from './dtos/update-diagnostic.dto';

@Injectable()
export class DiagnosticService {
  constructor(
    @InjectRepository(Diagnostic)
    private readonly repo: Repository<Diagnostic>,
  ) {}

  async create(dto: CreateDiagnosticDto) {
    try {
      const med = this.repo.create(dto);
      return await this.repo.save(med);
    } catch (error) {
      if (error instanceof QueryFailedError && (error as any).code === '23505') {
        throw new BadRequestException('El diagnostico ya existe.');
      }
      throw error;
    }
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const med = await this.repo.findOne({ where: { id } });
    if (!med) throw new NotFoundException('Diagnostico no encontrado.');
    return med;
  }

  async update(id: number, dto: UpdateDiagnosticDto) {
    const med = await this.findOne(id);
    Object.assign(med, dto);
    return this.repo.save(med);
  }

  async remove(id: number) {
    const med = await this.findOne(id);
    await this.repo.remove(med);
    return { message: 'Diagnostico eliminado correctamente' };
  }
}
