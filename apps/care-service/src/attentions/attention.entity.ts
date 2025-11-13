import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Attention {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientid: number;

  @Column()
  nurseid: number;

  @Column()
  orderid: number;

  @Column({ nullable: true })
  medicationname?: string;

  @Column({ nullable: true })
  procedurename?: string;

  @Column({ nullable: true })
  dose?: string;

  @Column({ nullable: true })
  frequency?: string;

  @Column({ nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdat: Date;
}
