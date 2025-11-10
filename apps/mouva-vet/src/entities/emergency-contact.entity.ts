import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EmergencyContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  relationship: string;

  @Column({ length: 10 })
  phonenumber: string;
}
