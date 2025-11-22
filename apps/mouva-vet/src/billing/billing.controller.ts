import { Body, Controller, Post, Req } from '@nestjs/common';
import { BillingService } from './billing.service';
import { GenerateBillDto } from './dtos/generate-bill.dto';
import { ApiTags } from '@nestjs/swagger';
import express from 'express';

@ApiTags('billing')
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('generate')
  async generate(@Body() dto: GenerateBillDto,@Req() req: express.Request) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error('Authorization header missing');
    }

    const token = authHeader.replace('Bearer ', '');
    return this.billingService.generateBill(dto,token);
  }
}
