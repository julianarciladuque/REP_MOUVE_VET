import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Procedure } from './procedure.entity';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure-dto';

@Injectable()
export class ProcedureService {
  constructor(
    @InjectRepository(Procedure)
    private readonly repo: Repository<Procedure>,
  ) {}

  async create(dto: CreateProcedureDto) {
    try {
      const med = this.repo.create(dto);
      return await this.repo.save(med);
    } catch (error) {
      if (error instanceof QueryFailedError && (error as any).code === '23505') {
        throw new BadRequestException('El procedimiento ya existe.');
      }
      throw error;
    }
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const med = await this.repo.findOne({ where: { id } });
    if (!med) throw new NotFoundException('Procedimiento no encontrado.');
    return med;
  }

  async update(id: number, dto: UpdateProcedureDto) {
    const med = await this.findOne(id);
    Object.assign(med, dto);
    return this.repo.save(med);
  }

  async remove(id: number) {
    const med = await this.findOne(id);
    await this.repo.remove(med);
    return { message: 'Procedimiento eliminado correctamente' };
  }
}
