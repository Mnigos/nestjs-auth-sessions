import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { User } from '../users/interfaces/user.interface'

import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'

const mockUser = {
  _id: 'some id',
  name: 'some user nickname',
  email: 'email@email.com',
  pass: 'user password',
}

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy

  beforeEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { pass, ...rest } = mockUser

    const localStrategyModule: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn().mockImplementation((user: User) => {
              if (user.name === mockUser.name) return Promise.resolve(rest)
              throw new BadRequestException('Cannot find user with specify name')
            }),
          },
        },
      ],
    }).compile()

    localStrategy = localStrategyModule.get(LocalStrategy)
  })

  it('Should be defined', () => {
    expect(localStrategy).toBeDefined()
  })

  it('Should validate a user', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { pass, ...rest } = mockUser

    expect(localStrategy.validate(mockUser)).resolves.toEqual(rest)
  })

  it('Should not validate a user cause of name', () => {
    expect(
      localStrategy.validate({
        _id: mockUser._id,
        name: 'ee',
        pass: mockUser.pass,
        email: mockUser.email,
      })
    ).rejects.toThrow('Cannot find user with specify name')
  })
})
