import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity({ name: 'employee' })
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  identificationnumber: number;

  @Column()
  email: string;

  @Column()
  cellphone: string;

  @Column()
  birthdate: Date;
  @Column()
  address: string;

  // Relación con la tabla Role
  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' }) // Nombre de la FK en la tabla 'user'
  role: Role;
  @Column()
  username: string;
  @Column()
  password: string;

}
