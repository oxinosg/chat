import { Logger } from '@nestjs/common'
import {
  EventPublisher,
  ICommand,
  ICommandHandler,
  CommandHandler,
} from '@nestjs/cqrs'

import { UserCreatedEvent } from '../events'

import { User } from '@service-chat/domain/entities/user.entity'
import { RedisRepository } from '@service-chat/infrastucture/repository/chat.repository'
import { CreateUserRequest } from '@chat/proto'

export class CreateUserCommand implements ICommand {
  constructor(public readonly req: CreateUserRequest) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly repository: RedisRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateUserCommand) {
    Logger.log('CreateUserHandler', 'CreateUserCommand')

    const {
      req: { userId, socketId },
    } = command

    const result = await this.repository.createUser({ userId, socketId })

    const user = this.publisher.mergeObjectContext(
      new User(result.id, result.socketId, [], [], 'online'),
    )

    user.publish(new UserCreatedEvent(user))
    user.commit()

    return user
  }
}
