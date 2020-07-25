import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { User } from '../schemas'

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}
  async save(user) {
    try {
      const createdUser = new this.userModel({
        ...user,
      })

      const res = await createdUser.save()
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
        const user = this.userModel.findById(id)

        console.log(user)

        return user
      }
    } catch (err) {
      throw new Error(err)
    }
  }
}
