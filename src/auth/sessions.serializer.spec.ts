import { Test, TestingModule } from '@nestjs/testing'

import { User } from '../users/interfaces/user.interface'

import { SessionsSerializer } from './sessions.serializer'

const mockUser = {
  _id: 'some id',
  name: 'some user nickname',
  email: 'email@email.com',
  pass: 'user password',
}

describe('LocalStrategy', () => {
  let sessionsSerializer: SessionsSerializer

  beforeEach(async () => {
    const sessionsSerializerModule: TestingModule = await Test.createTestingModule({
      providers: [SessionsSerializer],
    }).compile()

    sessionsSerializer = sessionsSerializerModule.get(SessionsSerializer)
  })

  it('Should be defined', () => {
    expect(sessionsSerializer).toBeDefined()
  })

  it('Should done function in SerializeUser', () => {
    let userToWrite = null

    sessionsSerializer.serializeUser(mockUser, (err: Error, user: User) => (userToWrite = user))

    expect(userToWrite).toEqual(mockUser)
  })

  it('Should done function in DeserializeUser', () => {
    let payloadToWrite = null
    const someString = 'some string'

    sessionsSerializer.deserializeUser(
      someString,
      (err: Error, payload: string) => (payloadToWrite = payload)
    )

    expect(payloadToWrite).toEqual(someString)
  })
})
