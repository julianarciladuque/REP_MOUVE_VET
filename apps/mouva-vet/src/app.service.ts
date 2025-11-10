import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient-dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
  ) {}

  async create(dto: CreatePatientDto) {
    try {
      const patient = this.patientRepo.create(dto);
      return await this.patientRepo.save(patient);
    } catch (error) {
      if (error instanceof QueryFailedError && (error as any).code === '23505') {
        throw new BadRequestException('La cédula ya está registrada en el sistema.');
      }
      throw error;
    }
  }


  async findAll() {
    return this.patientRepo.find({ relations: ['emergencycontact', 'insurance'] });
  }

  async findById(id: number) {
    const patient = await this.patientRepo.findOne({
      where: { id },
      relations: ['emergencycontact', 'insurance'],
    });
    if (!patient) throw new NotFoundException('Paciente no encontrado por ID');
    return patient;
  }
  
  async findByCedula(identificationnumber: string) {
    const patient = await this.patientRepo.findOne({
      where: { identificationnumber },
      relations: ['emergencycontact', 'insurance'],
    });
    if (!patient) throw new NotFoundException('Paciente no encontrado por cédula');
    return patient;
  }

  async update(id: number, dto: UpdatePatientDto) {
    const patient = await this.findById(id);
    Object.assign(patient, dto);
    return this.patientRepo.save(patient);
  }
}
