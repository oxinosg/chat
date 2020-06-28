import { Injectable } from '@nestjs/common'
import { InjectRedis, Redis } from '@svtslv/nestjs-ioredis'
import { nanoid } from 'nanoid'

import {
  Message,
  Status,
  CreateMessageInput,
  CreateMessageResponse,
  CreateRoomInput,
  CreateRoomResponse,
  CreateUserInput,
  CreateUserResponse,
  GetRoomInput,
  GetUserInput,
  GetUserResponse,
  GetRoomResponse,
  GetUsersConnectionsInput,
  GetUsersConnectionsResponse,
  UserDisconnectInput,
} from '@service-chat/domain/contracts/chat.contract'

type Ok = 'OK'

// data: array of string that is returned from redis sort function
// argumentNames: arguments Inputed in sort function excluding id
function redisSortToObject(
  data: string[],
  argumentNames: string[],
): { [key: string]: string } {
  if (data.length % (argumentNames.length + 1) !== 0) {
    throw new Error('nope')
  }

  const obj = {}
  let id: string
  data.map((v, i) => {
    const pos = i % (argumentNames.length + 1)
    if (pos === 0) {
      id = v
      obj[v] = {}
    } else {
      if (!argumentNames[pos - 1]) {
        throw new Error('nope')
      }
      obj[id][argumentNames[pos - 1]] = v
    }
  })

  return obj
}

function redisHashToObject(data: string[]): { [key: string]: string } {
  const obj = {}
  let id: string
  data.map((v, i) => {
    const pos = i % 2
    if (pos === 0) {
      id = v
    } else {
      obj[id] = v
    }
  })

  return obj
}

// data: array of string that is returned from redis sort function
// argumentNames: arguments Inputed in sort function excluding id
// function redisSortToArray(
//   data: string[],
//   argumentNames: string[],
// ): [{ [key: string]: string }] {
//   if (data.length % argumentNames.length !== 0) {
//     throw new Error('nope')
//   }

//   const array = []
//   let obj = {}
//   let isEmpty = true
//   let id: string
//   data.map((v, i) => {
//     const pos = i % argumentNames.length
//     if (pos === 0 && !isEmpty) {
//       array.push({ ...obj })
//       obj = {}
//       isEmpty = true
//     } else {
//       if (!argumentNames[pos]) {
//         throw new Error('nope')
//       }
//       obj[argumentNames[pos]] = v
//     }
//   })

//   return obj
// }

// key format example
// keys = [[ 'redisKey', 'group' ]]
function multiTransformGrouped(res, keys = []) {
  if (Array.isArray(res) && res.length === keys.length) {
    return res.reduce((obj, curr, i) => {
      if (curr[0] !== null) {
        throw new Error('error')
      }
      obj[keys[i][1]] = {
        ...(obj[keys[i][1]] || {}),
        [keys[i][0]]: curr[1],
      }

      return obj
    }, {})
  }
}

function multiTransform(res, keys = []) {
  if (Array.isArray(res) && res.length === keys.length) {
    return res.reduce((obj, curr, i) => {
      if (curr[0] !== null) {
        throw new Error('error')
      }
      obj[keys[i]] = curr[1]
      return obj
    }, {})
  }
}

@Injectable()
export class RedisRepository {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  // async getRoomMessages(roomId: string): Promise<Message[]> {
  //   const res = await this.redis.sort(
  //     `room:${roomId}:messages`,
  //     'by',
  //     'nosort',
  //     'get',
  //     '#',
  //     'get',
  //     `room:${roomId}:message:*->content`,
  //     'get',
  //     `room:${roomId}:message:*->file`,
  //     'get',
  //     `room:${roomId}:message:*->sender`,
  //     'get',
  //     `room:${roomId}:message:*->time`,
  //   )

  //   if (Array.isArray(res)) {
  //     return redisSortToArray(res, ['id', 'content', 'file', 'sender', 'time'])
  //   }
  // }

  async createRoom({ members }: CreateRoomInput): Promise<CreateRoomResponse> {
    const id = nanoid()

    await this.redis
      .multi()
      .sadd(`room:${id}:members`, ...members)
      .sadd(`user:${members[0]}:rooms`, id)
      .set(`user:${members[0]}:status`, Status.online)
      .sadd(`user:${members[1]}:rooms`, id)
      .set(`user:${members[1]}:status`, Status.online)
      .exec()
    const res = await this.redis.smembers(`room:${id}:members`)

    return {
      id,
      members: res,
      messages: [],
      blocked: [],
      typing: [],
      seenBy: {},
    }
  }

  async createMessage({
    userId,
    roomId,
    content,
    file,
  }: CreateMessageInput): Promise<CreateMessageResponse> {
    const id = nanoid()
    await this.redis.hmset(
      `room:${roomId}:message:${id}`,
      'content',
      content,
      'file',
      file || 'nil',
      'sender',
      userId,
      'time',
      new Date().toISOString(),
    )
    await this.redis.sadd(`room:${roomId}:messages`, id)
    const message = await this.redis.hgetall(`room:${roomId}:message:${id}`)

    return {
      id,
      ...message,
    } as Message
  }

  async createUser({
    userId,
    socketId,
  }: CreateUserInput): Promise<CreateUserResponse> {
    if (userId && socketId) {
      const res = await this.redis.set(`user:${userId}:socketId`, socketId)

      if (res === 'OK') {
        return {
          id: userId,
          socketId,
        }
      }
    }
  }

  async clearUserSocket({ userId }: UserDisconnectInput): Promise<Ok> {
    return await this.redis.set(`user:${userId}:socketId`, 'nil')
  }

  async getUser({ userId }: GetUserInput): Promise<GetUserResponse> {
    const user_response = await this.redis
      .multi([
        ['smembers', `user:${userId}:rooms`],
        ['smembers', `user:${userId}:blocked`],
        ['get', `user:${userId}:status`],
      ])
      .exec()

    const user = multiTransform(user_response, ['rooms', 'blocked', 'status'])

    return {
      id: userId,
      ...user,
    }
  }

  async getUserAndRoomMeta({ userId }: GetUserInput): Promise<GetUserResponse> {
    const user_response = await this.redis
      .multi([
        ['smembers', `user:${userId}:rooms`],
        ['smembers', `user:${userId}:blocked`],
        ['get', `user:${userId}:status`],
      ])
      .exec()

    const user = multiTransform(user_response, ['rooms', 'blocked', 'status'])

    const rooms_response = await this.redis
      .multi(user.rooms.map((room) => ['smembers', `room:${room}:members`]))
      .exec()

    const rooms = rooms_response.reduce((arr, curr, i) => {
      if (curr[0] !== null) {
        throw new Error('error')
      }

      arr.push({ id: user.rooms[i], members: curr[1] })
      return arr
    }, [])

    return {
      user: {
        id: userId,
        ...user,
      },
      rooms,
    }
  }

  async getUsersSocketIds({
    userIds,
  }: GetUsersConnectionsInput): Promise<GetUsersConnectionsResponse> {
    const response = await this.redis
      .multi(userIds.map((id) => ['get', `user:${id}:socketId`]))
      .exec()

    return response.reduce(
      (arr, curr, i) => {
        if (curr[0] !== null) {
          throw new Error('error')
        }

        arr.users.push({ id: userIds[i], socketId: curr[1] })
        return arr
      },
      { users: [] },
    )
  }

  async getRoom({ roomId }: GetRoomInput): Promise<GetRoomResponse> {
    const room_response = await this.redis
      .multi([
        ['smembers', `room:${roomId}:members`],
        ['smembers', `room:${roomId}:messages`],
        ['smembers', `room:${roomId}:blocked`],
        ['get', `room:${roomId}:typing`],
      ])
      .exec()

    const room = multiTransform(room_response, [
      'members',
      'messageIds',
      'blocked',
      'typing',
    ])

    // TODO test performance diff between multi and sort for getting all messages
    const messages_response = await this.redis
      .multi(
        room.messageIds.map((id) => [
          'hgetall',
          `room:${roomId}:message:${id}`,
        ]),
      )
      .exec()

    const messages = messages_response.reduce((arr, curr, i) => {
      if (curr[0] !== null) {
        throw new Error('error')
      }

      arr.push({ id: room.messageIds[i], ...curr[1] })
      return arr
    }, [])

    return {
      id: roomId,
      members: room.members,
      messages,
      blocked: room.blocked,
      typing: room.typing,
      seenBy: {},
    }
  }
}
