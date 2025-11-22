import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from '../../entities/patient.entity';
@Entity()
export class CopayHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient)
  patient: Patient;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  year: number;

  @Column()
  date: Date;
}
