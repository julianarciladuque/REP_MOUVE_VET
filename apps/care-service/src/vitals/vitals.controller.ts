import { Controller, Post, Get, Param, Body, ParseIntPipe } from '@nestjs/common';
import { VitalsService } from './vitals.service';
import { CreateVitalDto } from './dto/create-vital.dto';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('vitals')
@Controller('vitals')
export class VitalsController {
  constructor(private readonly vitalsService: VitalsService) {}

  @Post()
  @ApiBody({ type: CreateVitalDto })
  @ApiResponse({ status: 201, description: 'Registro de signos vitales creado correctamente' })
  create(@Body() dto: CreateVitalDto) {
    return this.vitalsService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de todos los registros de signos vitales' })
  findAll() {
    return this.vitalsService.findAll();
  }

  @Get('patient/:id')
  @ApiResponse({ status: 200, description: 'Lista de signos vitales de un paciente específico' })
  findByPatient(@Param('id', ParseIntPipe) id: number) {
    return this.vitalsService.findByPatient(id);
  }
}
