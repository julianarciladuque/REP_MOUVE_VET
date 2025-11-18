import { Order } from 'apps/medical-record-service/src/entity/order.entityt';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Medication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  cost: number;

  @Column({ length: 50 })
  standarddose: string;
}
