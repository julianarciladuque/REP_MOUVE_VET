import { Controller, Post, Get, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AttentionsService } from './attentions.service';
import { CreateAttentionDto } from './dto/create-attention.dto';
import { JwtAuthGuard } from 'apps/login-service/src/guards/jwt.guard';
import { RolesGuard } from 'apps/login-service/src/guards/roles.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'apps/login-service/src/decorators/roles.decorator';

@ApiTags('attentions')
@Controller('attentions')
@UseGuards(JwtAuthGuard,RolesGuard)
export class AttentionsController {
  constructor(private readonly attentionsService: AttentionsService) {}

  @Post()
  @ApiBody({ type: CreateAttentionDto })
  @ApiResponse({ status: 201, description: 'Registro de atención creado correctamente' })
  @Roles('nurse')
  create(@Body() dto: CreateAttentionDto) {
    return this.attentionsService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de todas las atenciones' })
  @Roles('nurse')
  findAll() {
    return this.attentionsService.findAll();
  }

  @Get('patient/:id')
  @ApiResponse({ status: 200, description: 'Lista de atenciones por paciente' })
  @Roles('nurse')
  findByPatient(@Param('id', ParseIntPipe) id: number) {
    return this.attentionsService.findByPatient(id);
  }
}
