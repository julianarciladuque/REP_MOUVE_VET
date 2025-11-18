import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { MedicalRecordServiceService } from './medical-record-service.service';
import { PatientInfo } from './schemas/patientInfo.schema';
import { JwtAuthGuard } from 'apps/login-service/src/guards/jwt.guard';
import { CreateMedicalEntryDto } from './dto/create-medical-entry.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import express from 'express';

@Controller()
export class MedicalRecordServiceController {
  constructor(
    private readonly medicalRecordServiceService: MedicalRecordServiceService,
  ) {}

  @Get('patients')
  @UseGuards(JwtAuthGuard)
  async getPatients(@Req() req: express.Request) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error('Authorization header missing');
    }

    const token = authHeader.replace('Bearer ', '');
    return this.medicalRecordServiceService.getPatients(token);
  }
  
  @Get('patients/cedula/:cedula')
  @UseGuards(JwtAuthGuard)
  async getPatientByCedula(@Param('cedula') cedula: string,@Req() req: express.Request) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error('Authorization header missing');
    }

    const token = authHeader.replace('Bearer ', '');
    return this.medicalRecordServiceService.getPatientByCedula(cedula, token);
  }
  
  @Get('patients/:id')
  @UseGuards(JwtAuthGuard)
  async getPatientById(@Param('id') id: string,@Req() req: express.Request) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error('Authorization header missing');
    }

    const token = authHeader.replace('Bearer ', '');
    return this.medicalRecordServiceService.getPatientById(id, token);
  }

  @Post('patients/:cedula/entries')
  @UseGuards(JwtAuthGuard)
  addEntry(
    @Param('cedula') cedula: string,
    @Body() dto: CreateMedicalEntryDto,
    @Req() req: express.Request
  ) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error('Authorization header missing');
    }

    const token = authHeader.replace('Bearer ', '');
    return this.medicalRecordServiceService.addMedicalEntry(cedula, dto,token);
  }

  @Post('orders')
  @UseGuards(JwtAuthGuard)
  createOrder(
    @Body() dto: CreateOrderDto,
    @Req() req: express.Request
  ) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error('Authorization header missing');
    }

    const token = authHeader.replace('Bearer ', '');

    return this.medicalRecordServiceService.createOrder(dto, token);
  }
}
