import { Body, Controller, UseGuards, Post, Get, Req } from '@nestjs/common';
import { LoginServiceService } from './login-service.service';
import { AuthPayloadDto } from './dtos/auth.dto';
import { LocalGuard } from './guards/local.guard';
import express from 'express'
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller()
export class LoginServiceController {
  constructor(private readonly loginServiceService: LoginServiceService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Body() authPayload: AuthPayloadDto) {
    const user = this.loginServiceService.validateUser(authPayload);
    return user;
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: express.Request){
    return req.user;
  }
}
