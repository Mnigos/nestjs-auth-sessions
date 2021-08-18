import { PassportSerializer } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

import { User } from '../users/interfaces/user.interface'

@Injectable()
export class SessionsSerializer extends PassportSerializer {
  serializeUser(user: User, done: (err: Error, user: User) => void): void {
    done(null, user)
  }

  deserializeUser(payload: string, done: (err: Error, payload: string) => void): void {
    done(null, payload)
  }
}
