import { Types } from 'mongoose'

export interface User {
  _id: Types.ObjectId
  name: string
  email: string
  hashedPassword: string
  image: string
}
