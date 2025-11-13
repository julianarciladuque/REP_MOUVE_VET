import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { HrServiceService } from './hr-service.service';
import { Employee } from './entities/employee.entity';
import { JwtAuthGuard } from 'apps/login-service/src/guards/jwt.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'apps/login-service/src/guards/roles.guard';
import { Roles } from 'apps/login-service/src/decorators/roles.decorator';
import { CreateEmployeeDto } from './dtos/create-employee.dto';

@ApiTags('vitals')
@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('hr')
export class HrServiceController {
  constructor(private readonly hrServiceService: HrServiceService) {}
  
  @Post()
  @ApiBody({ type: CreateEmployeeDto })
  @ApiResponse({ status: 201, description: 'Registrar empleado' })
  @Roles('hr')
  async create(@Body() body: CreateEmployeeDto) {
    return this.hrServiceService.createEmployee(body);
  }
  
  @Get()
  @ApiResponse({ status: 200, description: 'Obtener empleado' })
  @Roles('hr')
  findAll(): Promise<Employee[]> {
    return this.hrServiceService.findAll();
  }
}
