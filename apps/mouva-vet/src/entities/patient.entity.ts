import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Unique } from 'typeorm';
import { EmergencyContact } from './emergency-contact.entity';
import { Insurance } from './insurance.entity';

@Entity()
@Unique(['identificationnumber']) 
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  identificationnumber: string;

  @Column({ length: 100 })
  fullname: string;

  @Column()
  birthdate: Date;

  @Column({ length: 10 })
  gender: string;

  @Column({ length: 30 })
  address: string;

  @Column({ length: 10 })
  phonenumber: string;

  @Column({ nullable: true })
  email: string;

  @OneToOne(() => EmergencyContact, { cascade: true })
  @JoinColumn()
  emergencycontact: EmergencyContact;

  @OneToOne(() => Insurance, { cascade: true })
  @JoinColumn()
  insurance: Insurance;
}
