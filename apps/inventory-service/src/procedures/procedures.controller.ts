import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ProcedureService } from './procedures.service';
import { UpdateProcedureDto } from './dto/update-procedure-dto';
import { CreateProcedureDto } from './dto/create-procedure.dto';

@Controller('procedure')
export class ProcedureController {
  constructor(private readonly procedureService: ProcedureService) {}

  @Post()
  create(@Body() dto: CreateProcedureDto) {
    return this.procedureService.create(dto);
  }

  @Get()
  findAll() {
    return this.procedureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.procedureService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProcedureDto) {
    return this.procedureService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.procedureService.remove(id);
  }
}
