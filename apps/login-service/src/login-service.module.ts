import { Module } from '@nestjs/common';
import { LoginServiceController } from './login-service.controller';
import { LoginServiceService } from './login-service.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'abc123',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [LoginServiceController],
  providers: [LoginServiceService, LocalStrategy, JwtStrategy],
  exports: [JwtModule, PassportModule, JwtStrategy], // 👈 importante
})
export class LoginServiceModule {}
