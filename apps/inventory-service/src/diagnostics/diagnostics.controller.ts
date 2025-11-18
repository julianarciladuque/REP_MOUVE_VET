import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreateDiagnosticDto } from './dtos/create-diagnostic.dto';
import { DiagnosticService } from './diagnostics.service';
import { UpdateDiagnosticDto } from './dtos/update-diagnostic.dto';
import { JwtAuthGuard } from 'apps/login-service/src/guards/jwt.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'apps/login-service/src/guards/roles.guard';
import { Roles } from 'apps/login-service/src/decorators/roles.decorator';

@ApiTags('diagnostic')
@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('diagnostic')
export class DiagnosticController {
  constructor(private readonly diagnosticService: DiagnosticService) {}

  @Post()
  @ApiBody({ type: CreateDiagnosticDto })
  @ApiResponse({ status: 201, description: 'Crear diagnostico' })
  @Roles('support')
  create(@Body() dto: CreateDiagnosticDto) {
    return this.diagnosticService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Obtener todos los diagnosticos' })
  @Roles('support','doctor')
  findAll() {
    return this.diagnosticService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Obtener diagnostico por id' })
  @Roles('support','doctor')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.diagnosticService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateDiagnosticDto })
  @ApiResponse({ status: 201, description: 'Actualizar diagnostico' })
  @Roles('support')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDiagnosticDto) {
    return this.diagnosticService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Eliminar diagnostico' })
  @Roles('support')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.diagnosticService.remove(id);
  }
}
