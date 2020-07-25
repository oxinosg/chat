import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface Room extends mongoose.Document {
  readonly id: string
  readonly members: string[]
  readonly messages: string[]
  readonly blocked: string[]
  readonly typing: string[]
  readonly seenBy: string[]
}

export const RoomSchema = new Schema({
  id: Schema.Types.ObjectId,
  members: [{ type: String }],
  messages: [{ type: String }],
  blocked: [{ type: String }],
  typing: [{ type: String }],
  seenBy: [{ type: String }],
})

export const RoomModel = mongoose.model<Room>('Room', RoomSchema)
