import { Body, Controller, Get, Post } from '@nestjs/common';
import { HrServiceService } from './hr-service.service';
import { Employee } from './entities/employee.entity';

@Controller()
export class HrServiceController {
  constructor(private readonly hrServiceService: HrServiceService) {}
  
  @Post()
  async create(@Body() body: any) {
    return this.hrServiceService.createEmployee(body);
  }
  
  @Get()
  findAll(): Promise<Employee[]> {
    return this.hrServiceService.findAll();
  }
}
