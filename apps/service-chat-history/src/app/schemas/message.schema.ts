import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface Message extends mongoose.Document {
  readonly id: string
  readonly content: string
  readonly sender: string
  readonly time: string
  readonly file: string
}

export const MessageSchema = new Schema({
  id: Schema.Types.ObjectId,
  content: String,
  sender: String,
  time: String,
  file: String,
})

export const MessageModel = mongoose.model<Message>('Message', MessageSchema)
