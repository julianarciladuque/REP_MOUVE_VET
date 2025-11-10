import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Diagnostic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  cost: number;

  @Column({ default: false })
  requiresspecialist: boolean;
}
