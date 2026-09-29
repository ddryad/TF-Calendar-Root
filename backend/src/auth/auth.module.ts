import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { CookieStrategy } from './strategies/cookie.strategy';


@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers : [AuthService, CookieStrategy, GoogleStrategy]
})
export class AuthModule {}
