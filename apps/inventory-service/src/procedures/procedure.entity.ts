import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Procedure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  cost: number;

  @Column()
  frequency: string;

  @Column({ default: false })
  requiresspecialist: boolean;
}
