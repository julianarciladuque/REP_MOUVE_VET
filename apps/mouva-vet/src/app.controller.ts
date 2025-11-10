import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() dto: CreatePatientDto) {
    return this.appService.create(dto);
  }

  @Get()
  findAll() {
    return this.appService.findAll();
  }

  // Buscar por ID (numérico)
  @Get('id/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.appService.findById(id);
  }

  // Buscar por cédula (string)
  @Get('cedula/:cedula')
  findByCedula(@Param('cedula') cedula: string) {
    return this.appService.findByCedula(cedula);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePatientDto) {
    return this.appService.update(id, dto);
  }
}
