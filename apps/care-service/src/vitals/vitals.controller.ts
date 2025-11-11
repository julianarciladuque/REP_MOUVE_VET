import { Controller, Post, Get, Param, Body, ParseIntPipe } from '@nestjs/common';
import { VitalsService } from './vitals.service';
import { CreateVitalDto } from './dto/create-vital.dto';

@Controller('vitals')
export class VitalsController {
  constructor(private readonly vitalsService: VitalsService) {}

  @Post()
  create(@Body() dto: CreateVitalDto) {
    return this.vitalsService.create(dto);
  }

  @Get()
  findAll() {
    return this.vitalsService.findAll();
  }

  @Get('patient/:id')
  findByPatient(@Param('id', ParseIntPipe) id: number) {
    return this.vitalsService.findByPatient(id);
  }
}
