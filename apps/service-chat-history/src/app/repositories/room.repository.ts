import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { Room } from '../schemas'

@Injectable()
export class RoomRepository {
  constructor(
    @InjectModel('Room')
    private roomModel: Model<Room>,
  ) {}
  async save(room) {
    try {
      const createdRoom = new this.roomModel({
        ...room,
      })

      const res = await createdRoom.save()
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

  async find({ id }: { id?: string }) {
    if (!id) {
      return
    }

    try {
      if (id) {
        const room = this.roomModel.findById(id)

        console.log(room)

        return room
      }
    } catch (err) {
      throw new Error(err)
    }
  }
}
