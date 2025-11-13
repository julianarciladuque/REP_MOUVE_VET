import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProcedureService } from './procedures.service';
import { UpdateProcedureDto } from './dto/update-procedure-dto';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/login-service/src/guards/jwt.guard';
import { RolesGuard } from 'apps/login-service/src/guards/roles.guard';
import { Roles } from 'apps/login-service/src/decorators/roles.decorator';

@ApiTags('procedure')
@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('procedure')
export class ProcedureController {
  constructor(private readonly procedureService: ProcedureService) {}

  @Post()
  @ApiBody({ type: CreateProcedureDto })
  @ApiResponse({ status: 201, description: 'Crear procedimiento' })
  @Roles('support')
  create(@Body() dto: CreateProcedureDto) {
    return this.procedureService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Obtener todos los procedimientos' })
  @Roles('support')
  findAll() {
    return this.procedureService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Obtener procedimiento por id' })
  @Roles('support')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.procedureService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateProcedureDto })
  @ApiResponse({ status: 201, description: 'Actualizar procedimiento' })
  @Roles('support')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProcedureDto) {
    return this.procedureService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Eliminar procedimiento' })
  @Roles('support')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.procedureService.remove(id);
  }
}
