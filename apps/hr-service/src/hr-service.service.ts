import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { Role } from './entities/role.entity';

@Injectable()
export class HrServiceService {
  constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    @InjectRepository(Role) private roleRepository: Repository<Role>) { }

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async createEmployee(data: any): Promise<Employee> {
    const role = await this.roleRepository.findOneBy({ id: data.role_id });
    if (!role) {
      throw new Error('El rol no existe');
    }

    const employee = this.employeeRepository.create({
      name: data.name,
      identificationnumber: data.identificationnumber,
      email: data.email,
      cellphone: data.cellphone,
      birthdate: data.birthdate,
      address: data.address,
      role,
      username: data.username,
      password: data.password,
    });

    return this.employeeRepository.save(employee);
  }
}
