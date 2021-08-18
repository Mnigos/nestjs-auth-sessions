import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { User } from '../users/interfaces/user.interface'

import { AuthService } from './auth.service'
import { UserToReturn } from './interfaces/user-to-return.interface'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(user: User): Promise<UserToReturn> {
    const foundedUser = await this.authService.validateUser(user)

    if (!foundedUser) throw new UnauthorizedException()
    return foundedUser
  }
}
