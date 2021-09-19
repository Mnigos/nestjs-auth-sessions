import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { AuthService } from './auth.service'
import { UserToReturn } from './interfaces/user-to-return.interface'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<UserToReturn> {
    const foundedUser = await this.authService.validateUser(username, password)

    if (!foundedUser) throw new UnauthorizedException()
    return foundedUser
  }
}
