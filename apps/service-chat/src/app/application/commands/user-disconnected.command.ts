import { Logger } from '@nestjs/common'
import {
  EventBus,
  ICommand,
  ICommandHandler,
  CommandHandler,
} from '@nestjs/cqrs'

import { UserDisconnectedEvent } from '../events'

import { RedisRepository } from '@service-chat/infrastucture/repository/chat.repository'
import { UserDisconnectRequest } from '@chat/proto'

export class UserDisconnectedCommand implements ICommand {
  constructor(public readonly req: UserDisconnectRequest) {}
}

@CommandHandler(UserDisconnectedCommand)
export class UserDisconnectedHandler
  implements ICommandHandler<UserDisconnectedCommand> {
  constructor(
    private readonly repository: RedisRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UserDisconnectedCommand) {
    Logger.log('UserDisconnectedHandler', 'UserDisconnectedCommand')

    const {
      req: { userId },
    } = command

    await this.repository.clearUserSocket({ userId })

    this.eventBus.publish(new UserDisconnectedEvent({ userId }))
  }
}
