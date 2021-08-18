import { Document } from 'mongoose'

import { User } from './user.interface'

export type UserDoc = Omit<User, '_id'> & Document
