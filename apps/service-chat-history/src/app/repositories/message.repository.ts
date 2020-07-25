import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { Message } from '../schemas'

@Injectable()
export class MessageRepository {
  constructor(
    @InjectModel('Message')
    private messageModel: Model<Message>,
  ) {}
  async save(message) {
    try {
      const createdMessage = new this.messageModel({
        ...message,
      })

      const res = await createdMessage.save()
      const { ...rest } = res.toObject({
        versionKey: false,
        flattenMaps: true,
      })

      return {
        ...rest,
      }
    } catch (err) {
      throw new Error(err)
    }
  }
}
