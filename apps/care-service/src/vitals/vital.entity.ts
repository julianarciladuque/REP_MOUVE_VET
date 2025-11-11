import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Vital {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientid: number;

  @Column()
  nurseid: number;

  @Column()
  bloodpressure: string;

  @Column('decimal', { precision: 5, scale: 2 })
  temperature: number;

  @Column()
  pulse: number;

  @Column('decimal', { precision: 5, scale: 2 })
  oxygenlevel: number;

  @CreateDateColumn()
  createdat: Date;
}
