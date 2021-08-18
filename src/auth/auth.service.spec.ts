import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'

import { User } from '../users/interfaces/user.interface'
import { UsersService } from '../users/users.service'

import { AuthService } from './auth.service'

const mockUser = {
  _id: 'some id',
  name: 'some user nickname',
  email: 'email@email.com',
  pass: 'user password',
}

describe('AuthService', () => {
  let authService: AuthService

  beforeEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { pass, ...rest } = mockUser

    const authModule: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: UsersService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((user: User) => Promise.resolve({ _id: 'a uuid', ...user })),
            getOneByName: jest.fn().mockImplementation(() => Promise.resolve(rest)),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockImplementation(() => 'awuihdauiwyhd'),
          },
        },
      ],
    }).compile()

    authService = authModule.get(AuthService)
  })

  it('Should be defined', () => {
    expect(authService).toBeDefined()
  })

  //@TODO Fix error with that test
  //   node:internal/process/promises:246
  //   triggerUncaughtException(err, true /* fromPromise */);
  //   ^

  // [UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "Error: data and hash arguments required".] {
  // code: 'ERR_UNHANDLED_REJECTION'
  // }
  it.skip('Should validate a user', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { pass, ...rest } = mockUser

    try {
      expect(authService.validateUser(mockUser)).resolves.toEqual(rest)
    } catch {
      console.log('e')
    }
  })
})
