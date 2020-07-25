import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface User extends mongoose.Document {
  readonly id: string
  readonly status: string
  readonly rooms: string[]
  readonly blocked: string[]
}

export const UserSchema = new Schema({
  id: String,
  status: {
    type: String,
  },
  rooms: [{ type: String }],
  blocked: [{ type: String }],
})

export const UserModel = mongoose.model<User>('User', UserSchema)
