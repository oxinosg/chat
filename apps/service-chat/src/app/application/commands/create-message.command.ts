import { Logger } from '@nestjs/common'
import {
  EventPublisher,
  ICommand,
  ICommandHandler,
  CommandHandler,
} from '@nestjs/cqrs'

import { MessageCreatedEvent } from '../events'

import { Message } from '@service-chat/domain/entities/message.entity'
import { RedisRepository } from '@service-chat/infrastucture/repository/chat.repository'
import { CreateMessageRequest } from '@chat/proto'

export class CreateMessageCommand implements ICommand {
  constructor(public readonly req: CreateMessageRequest) {}
}

@CommandHandler(CreateMessageCommand)
export class CreateMessageHandler
  implements ICommandHandler<CreateMessageCommand> {
  constructor(
    private readonly repository: RedisRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateMessageCommand) {
    Logger.log('CreateMessageHandler', 'CreateMessageCommand')

    const {
      req: { content, roomId, userId },
    } = command

    const result = await this.repository.createMessage({
      userId,
      roomId,
      content,
    })

    if (result) {
      // TODO create model first and generate tim from model, then send to redis
      const message = this.publisher.mergeObjectContext(
        new Message(result.id, result.content, result.sender),
      )

      message.publish(new MessageCreatedEvent(message))
      message.commit()

      return message
    }
  }
}
