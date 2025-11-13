import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/login-service/src/guards/jwt.guard';
import { RolesGuard } from 'apps/login-service/src/guards/roles.guard';
import { Roles } from 'apps/login-service/src/decorators/roles.decorator';

@ApiTags('medications')
@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  @ApiBody({ type: MedicationsService })
  @ApiResponse({ status: 201, description: 'Crear medicamento' })
  @Roles('support')
  create(@Body() dto: CreateMedicationDto) {
    return this.medicationsService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Obtener todos los medicamentos' })
  @Roles('support')
  findAll() {
    return this.medicationsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Obtener medicamento por id' })
  @Roles('support')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicationsService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateMedicationDto })
  @ApiResponse({ status: 201, description: 'Actualizar medicamento' })
  @Roles('support')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMedicationDto) {
    return this.medicationsService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Eliminar medicamento' })
  @Roles('support')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicationsService.remove(id);
  }
}
