import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { UsersModule } from '../users/users.module'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { LocalStrategy } from './local.strategy'

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      sessions: true,
    }),
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
