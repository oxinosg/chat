import { Logger } from '@nestjs/common'
import { IQueryHandler, IQuery, QueryHandler } from '@nestjs/cqrs'

import { RedisRepository } from '@service-chat/infrastucture/repository/chat.repository'
import { GetRoomRequest } from '@chat/proto'

export class GetRoomQuery implements IQuery {
  constructor(public readonly req: GetRoomRequest) {}
}

@QueryHandler(GetRoomQuery)
export class GetRoomHandler implements IQueryHandler<GetRoomQuery> {
  constructor(private readonly repository: RedisRepository) {}

  async execute({ req: { roomId } }: GetRoomQuery) {
    Logger.log('GetRoomHandler', 'GetRoomQuery')

    try {
      const result = await this.repository.getRoom({ roomId })

      return result
    } catch (error) {
      throw new Error(error)
    }
  }
}
