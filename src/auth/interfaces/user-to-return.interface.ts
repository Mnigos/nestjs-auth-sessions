import { User } from '../../users/interfaces/user.interface'

export type UserToReturn = Omit<User, 'pass'>
