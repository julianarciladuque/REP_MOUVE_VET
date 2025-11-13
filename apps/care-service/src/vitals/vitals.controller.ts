import { Controller, Post, Get, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { VitalsService } from './vitals.service';
import { CreateVitalDto } from './dto/create-vital.dto';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/login-service/src/guards/jwt.guard';
import { Roles } from 'apps/login-service/src/decorators/roles.decorator';
import { RolesGuard } from 'apps/login-service/src/guards/roles.guard';

@ApiTags('vitals')
@Controller('vitals')
@UseGuards(JwtAuthGuard,RolesGuard)
export class VitalsController {
  constructor(private readonly vitalsService: VitalsService) {}

  @Post()
  @ApiBody({ type: CreateVitalDto })
  @ApiResponse({ status: 201, description: 'Registro de signos vitales creado correctamente' })
  @Roles('nurse')
  create(@Body() dto: CreateVitalDto) {
    return this.vitalsService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de todos los registros de signos vitales' })
  @Roles('nurse')
  findAll() {
    return this.vitalsService.findAll();
  }

  @Get('patient/:id')
  @ApiResponse({ status: 200, description: 'Lista de signos vitales de un paciente específico' })
  @Roles('nurse')
  findByPatient(@Param('id', ParseIntPipe) id: number) {
    return this.vitalsService.findByPatient(id);
  }
}
