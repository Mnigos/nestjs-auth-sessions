import { Injectable, UnauthorizedException } from '@nestjs/common'
import { compare } from 'bcrypt'

import { User } from '../users/interfaces/user.interface'
import { UsersService } from '../users/users.service'

import { UserToReturn } from './interfaces/user-to-return.interface'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(user: User): Promise<UserToReturn> {
    const { name, pass, ...rest } = user

    const foundedUser = await this.usersService.getOneByName(name)
    const hashedPass = compare(pass, foundedUser.pass)
    if (!foundedUser || !hashedPass) throw new UnauthorizedException()

    return {
      name,
      ...rest,
    }
  }
}
