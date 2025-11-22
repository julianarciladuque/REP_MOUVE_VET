import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from '../../entities/patient.entity';

@Entity()
export class Billing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient)
  patient: Patient;

  @Column()
  doctorname: string;

  @Column({ type: 'jsonb' })
  clinicalDetails: any; // medicamentos, procedimientos, exámenes

  @Column('decimal', { precision: 10, scale: 2 })
  totalCost: number;

  @Column('decimal', { precision: 10, scale: 2 })
  patientPay: number;

  @Column('decimal', { precision: 10, scale: 2 })
  insurancePay: number;

  @Column()
  date: Date;
}
