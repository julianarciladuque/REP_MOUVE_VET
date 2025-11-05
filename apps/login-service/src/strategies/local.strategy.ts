import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginServiceService } from '../login-service.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private loginService: LoginServiceService) {
    super({ usernameField: 'userName' }); // importante!
  }

  async validate(userName: string, password: string) {
    const user = await this.loginService.validateUser({ userName, password });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
