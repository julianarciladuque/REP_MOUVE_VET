import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'abc123', // 👈 Debe coincidir con tu JwtModule.register()
    });
  }

  async validate(payload: any) {
    console.log('✅ Validando JWT, payload:', payload);
    return { id: payload.sub, username: payload.username, role: payload.role };
  }
}
