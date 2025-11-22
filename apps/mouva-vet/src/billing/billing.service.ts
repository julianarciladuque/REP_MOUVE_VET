import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Billing } from './entities/billing.entity';
import { CopayHistory } from './entities/copay-history.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { GenerateBillDto } from './dtos/generate-bill.dto';
import { Patient } from '../entities/patient.entity';
import { OrderClient } from '../clients/order-client';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Billing)
    private billingRepo: Repository<Billing>,
    @InjectRepository(CopayHistory)
    private copayRepo: Repository<CopayHistory>,
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,    
    private readonly orderClient: OrderClient
  ) {}

  async generateBill(dto: GenerateBillDto,token: string) {
    const patient = await this.patientRepo.findOne({
      where: { id: dto.patientId },
      relations: ['insurance'],
    });

    if (!patient) {
      throw new NotFoundException('Paciente no encontrado');
    }
    const clinicalResp = await this.orderClient.getPatientByCedula(dto.patiendCedula,token);

    const clinicalData = clinicalResp.data;
    const totalCost = clinicalData.totalCost;
    const year = new Date().getFullYear();

    const copayAccumulated = await this.copayRepo
      .createQueryBuilder('copay')
      .select('SUM(copay.amount)', 'sum')
      .where('copay.patientId = :pid', { pid: patient.id })
      .andWhere('copay.year = :year', { year })
      .getRawOne();

    const accumulated = Number(copayAccumulated.sum ?? 0);

    let patientPay = 0;
    let insurancePay = totalCost;

    const insuranceActive = patient.insurance?.isactive === true;

    if (!insuranceActive) {
      patientPay = totalCost;
      insurancePay = 0;
    } else {
      if (accumulated >= 1_000_000) {
        patientPay = 0;
        insurancePay = totalCost;
      } else {
        patientPay = 50_000;
        insurancePay = totalCost - 50_000;

        const copay = this.copayRepo.create({
          patient,
          amount: patientPay,
          year,
          date: new Date(),
        });
        await this.copayRepo.save(copay);
      }
    }

    const bill = this.billingRepo.create({
      patient,
      doctorname: clinicalData.doctorName,
      clinicalDetails: clinicalData,
      totalCost,
      patientPay,
      insurancePay,
      date: new Date(),
    });

    await this.billingRepo.save(bill);

    const age =
      new Date().getFullYear() -
      new Date(patient.birthdate).getFullYear();

    const expirationDate = patient.insurance?.expirationdate
      ? new Date(patient.insurance.expirationdate)
      : null;

    const daysLeft = expirationDate
      ? Math.ceil((expirationDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : null;

    return {
      billId: bill.id,
      date: bill.date,

      patient: {
        name: patient.fullname,
        cedula: patient.identificationnumber,
        age,
      },

      doctor: bill.doctorname,

      insurance: patient.insurance
        ? {
            company: patient.insurance.companyname,
            policynumber: patient.insurance.policynumber,
            expiration: expirationDate,
            daysLeft,
          }
        : null,

      clinicalDetails: clinicalData,

      costs: {
        totalCost,
        patientPay,
        insurancePay,
      },
    };
  }
}
