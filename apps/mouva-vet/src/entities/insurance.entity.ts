import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Insurance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyname: string;

  @Column()
  policynumber: string;

  @Column({ default: true })
  isactive: boolean;

  @Column({ type: 'date' })
  expirationdate: Date;
}
