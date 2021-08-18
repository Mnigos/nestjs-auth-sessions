import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { CreateUserDto } from './interfaces/create-user.interface'
import { UserDoc } from './interfaces/user-doc.interface'
import { User } from './interfaces/user.interface'

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly userModel: Model<UserDoc>) {}

  async getAll(): Promise<User[]> {
    return (await this.userModel.find().exec()) as User[]
  }

  async getOneById(_id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id }).exec()

    if (!user) return null

    return user as User
  }

  async getOneByName(name: string): Promise<User> {
    const user = await this.userModel.findOne({ name }).exec()

    if (!user) return null

    return user as User
  }

  async getOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec()

    if (!user) return null

    return user as User
  }

  async create(user: CreateUserDto): Promise<boolean> {
    const { name, email, pass } = user

    const isNameConflict = await this.userModel.findOne({ name })
    if (isNameConflict) throw new ConflictException('Username has already been taken')

    const isEmailConfict = await this.userModel.findOne({ email })
    if (isEmailConfict) throw new ConflictException('Account with this email has already exists')

    const passRegex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/
    if (!pass.match(passRegex)) throw new BadRequestException('Password does not match regex')

    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    if (!email.match(emailRegex)) throw new BadRequestException('Email does not match regex')

    const saltRounds = 10
    const hash = await bcrypt.hash(pass, saltRounds)

    this.userModel.create({
      name,
      email,
      pass: hash,
    })

    return true
  }

  async update(user: User): Promise<User> {
    const { _id } = user

    const updatedUser = await this.userModel.findOne({ _id })

    if (!updatedUser) throw new BadRequestException('Cannot find that user')

    await this.userModel.updateOne({ _id }, user)

    return updatedUser as User
  }

  async delete(_id: string): Promise<boolean> {
    const deletedUser = await this.userModel.remove({ _id })

    if (!deletedUser) throw new BadRequestException('Something went wrong with deleting this user')

    return true
  }
}
