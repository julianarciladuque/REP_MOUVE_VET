import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto } from './dtos/auth.dto';

const fakeuser = [
  { id: 1, userName: 'julian', password: 'password', role: 'admin' },
  { id: 2, userName: 'juliana', password: 'password', role: 'nurse' },
  { id: 3, userName: 'lina', password: 'password', role: 'hr' },
  { id: 4, userName: 'pao', password: 'password', role: 'support' },
  { id: 5, userName: 'pablo', password: 'password', role: 'admin' },
  { id: 5, userName: 'yo', password: 'password', role: 'doctor' },
];

@Injectable()
export class LoginServiceService {
  constructor(private jwtService: JwtService) {}

  validateUser({ userName, password }: AuthPayloadDto) {
    const user = fakeuser.find((u) => u.userName === userName && u.password === password);
    if (!user) return null;
    const { password: _, ...result } = user; // quitamos la contraseña
    return result; // { id, userName, role }
  }

  login(user: any) {
    const payload = { username: user.userName, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
