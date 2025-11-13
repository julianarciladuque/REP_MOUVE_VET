import { Body, Controller, UseGuards, Post, Get, Req, UnauthorizedException } from '@nestjs/common';
import { LoginServiceService } from './login-service.service';
import { AuthPayloadDto } from './dtos/auth.dto';
import { LocalGuard } from './guards/local.guard';
import express from 'express'
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller()
export class LoginServiceController {
  constructor(private readonly loginServiceService: LoginServiceService) {}

  @Post('login')
  login(@Body() authDto: AuthPayloadDto) {
    const user = this.loginServiceService.validateUser(authDto);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    return this.loginServiceService.login(user);
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: express.Request){
    return req.user;
  }
}
