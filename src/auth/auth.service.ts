import { Injectable, UnauthorizedException } from '@nestjs/common'
import { compare } from 'bcrypt'

import { UsersService } from '../users/users.service'

import { UserToReturn } from './interfaces/user-to-return.interface'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<UserToReturn> {
    const foundedUser = await this.usersService.getOneByName(username)
    const { pass, ...rest } = foundedUser
    const hashedPass = compare(password, pass)
    if (!hashedPass) throw new UnauthorizedException()

    return {
      ...rest,
    }
  }
}
