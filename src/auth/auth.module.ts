import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { UsersModule } from '../users/users.module'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { LocalStrategy } from './local.strategy'
import { SessionsSerializer } from './sessions.serializer'

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      sessions: true,
    }),
  ],
  providers: [AuthService, LocalStrategy, SessionsSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
