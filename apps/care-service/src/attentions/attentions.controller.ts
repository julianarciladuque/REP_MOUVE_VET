import { Controller, Post, Get, Param, Body, ParseIntPipe } from '@nestjs/common';
import { AttentionsService } from './attentions.service';
import { CreateAttentionDto } from './dto/create-attention.dto';

@Controller('attentions')
export class AttentionsController {
  constructor(private readonly attentionsService: AttentionsService) {}

  @Post()
  create(@Body() dto: CreateAttentionDto) {
    return this.attentionsService.create(dto);
  }

  @Get()
  findAll() {
    return this.attentionsService.findAll();
  }

  @Get('patient/:id')
  findByPatient(@Param('id', ParseIntPipe) id: number) {
    return this.attentionsService.findByPatient(id);
  }
}
