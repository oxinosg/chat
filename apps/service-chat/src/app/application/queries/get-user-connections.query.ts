import { Logger } from '@nestjs/common'
import { IQueryHandler, IQuery, QueryHandler } from '@nestjs/cqrs'

import { RedisRepository } from '@service-chat/infrastucture/repository/chat.repository'
import { GetUsersConnectionsRequest } from '@chat/proto'

export class GetUsersConnectionsQuery implements IQuery {
  constructor(public readonly req: GetUsersConnectionsRequest) {}
}

@QueryHandler(GetUsersConnectionsQuery)
export class GetUsersConnectionsHandler
  implements IQueryHandler<GetUsersConnectionsQuery> {
  constructor(private readonly repository: RedisRepository) {}

  async execute({ req: { userIds } }: GetUsersConnectionsQuery) {
    Logger.log('GetUsersConnectionsHandler', 'GetUsersConnectionsQuery')

    try {
      const result = await this.repository.getUsersSocketIds({ userIds })

      return result
    } catch (error) {
      throw new Error(error)
    }
  }
}
