import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { CreateDiagnosticDto } from './dtos/create-diagnostic.dto';
import { DiagnosticService } from './diagnostics.service';
import { UpdateDiagnosticDto } from './dtos/update-diagnostic.dto';

@Controller('diagnostic')
export class DiagnosticController {
  constructor(private readonly diagnosticService: DiagnosticService) {}

  @Post()
  create(@Body() dto: CreateDiagnosticDto) {
    return this.diagnosticService.create(dto);
  }

  @Get()
  findAll() {
    return this.diagnosticService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.diagnosticService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDiagnosticDto) {
    return this.diagnosticService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.diagnosticService.remove(id);
  }
}
