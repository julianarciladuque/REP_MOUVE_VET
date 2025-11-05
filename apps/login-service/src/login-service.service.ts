import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto } from './dtos/auth.dto';

const fakeuser = [
  { id: 1, userName: 'julian', password: 'password' },
  { id: 2, userName: 'juliana', password: 'password' },
];

@Injectable()
export class LoginServiceService {
  constructor(private jwtService: JwtService) {}

  validateUser({ userName, password }: AuthPayloadDto) {
    const findUser = fakeuser.find((user) => user.userName === userName);
    if (!findUser) return null;
    if (password === findUser.password) {
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }
    return null;
  }
}
