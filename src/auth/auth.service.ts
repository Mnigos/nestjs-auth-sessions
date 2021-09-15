import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'

import { User } from '../users/interfaces/user.interface'
import { UsersService } from '../users/users.service'

import { Credentials } from './interfaces/credentials.interface'
import { UserToReturn } from './interfaces/user-to-return.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(user: User): Promise<UserToReturn> {
    const { name, pass, ...rest } = user

    const foundedUser = await this.usersService.getOneByName(name)
    const hashedPass = compare(pass, foundedUser.pass)
    if (!hashedPass) throw new UnauthorizedException()

    return {
      name,
      ...rest,
    }
  }

  async login(credentials: Credentials): Promise<{ access_token: string }> {
    const { nameOrEmail } = credentials

    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

    const foundedUser = nameOrEmail.match(emailRegex)
      ? await this.usersService.getOneByEmail(nameOrEmail)
      : await this.usersService.getOneByName(nameOrEmail)

    const { name, _id } = await this.usersService.getOneByName(foundedUser.name)

    const payload = { name, sub: _id }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
