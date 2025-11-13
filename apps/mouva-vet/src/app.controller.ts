import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient-dto';
import { JwtAuthGuard } from 'apps/login-service/src/guards/jwt.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'apps/login-service/src/guards/roles.guard';
import { Roles } from 'apps/login-service/src/decorators/roles.decorator';


@ApiTags('admin')
@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('admin')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @ApiBody({ type: CreatePatientDto })
  @ApiResponse({ status: 201, description: 'Registrar paciente' })
  @Roles('admin')
  create(@Body() dto: CreatePatientDto) {
    return this.appService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Obtener pacientes' })
  @Roles('admin')
  findAll() {
    return this.appService.findAll();
  }

  // Buscar por ID (numérico)
  @Get('id/:id')
  @ApiResponse({ status: 200, description: 'Obtener paciente por id' })
  @Roles('admin')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.appService.findById(id);
  }

  // Buscar por cédula (string)
  @Get('cedula/:cedula')
  @Get('id/:id')
  @ApiResponse({ status: 200, description: 'Obtener paciente por cedula' })
  findByCedula(@Param('cedula') cedula: string) {
    return this.appService.findByCedula(cedula);
  }

  @Put(':id')
  @ApiBody({ type: UpdatePatientDto })
  @ApiResponse({ status: 201, description: 'Actualizar paciente' })
  @Roles('admin')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePatientDto) {
    return this.appService.update(id, dto);
  }
}
