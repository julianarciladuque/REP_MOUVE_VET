// src/hr-service/entities/role.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Employee } from './employee.entity';

@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Un rol puede tener muchos usuarios
  @OneToMany(() => Employee, (employee) => employee.role)
  users: Employee[];
}
