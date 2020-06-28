import { Logger } from '@nestjs/common'
import { IQueryHandler, IQuery, QueryHandler } from '@nestjs/cqrs'

import { RedisRepository } from '@service-chat/infrastucture/repository/chat.repository'
import { GetUserRequest } from '@chat/proto'

export class GetUserAndRoomMetaQuery implements IQuery {
  constructor(public readonly req: GetUserRequest) {}
}

@QueryHandler(GetUserAndRoomMetaQuery)
export class GetUserAndRoomMetaHandler
  implements IQueryHandler<GetUserAndRoomMetaQuery> {
  constructor(private readonly repository: RedisRepository) {}

  async execute({ req: { userId } }: GetUserAndRoomMetaQuery) {
    Logger.log('GetUserAndRoomMetaHandler', 'GetUserAndRoomMetaQuery')

    try {
      const result = await this.repository.getUserAndRoomMeta({ userId })

      return result
    } catch (error) {
      throw new Error(error)
    }
  }
}
