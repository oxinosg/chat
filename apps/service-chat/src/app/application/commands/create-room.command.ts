import { Logger } from '@nestjs/common'
import {
  EventPublisher,
  ICommand,
  ICommandHandler,
  CommandHandler,
} from '@nestjs/cqrs'

import { RoomCreatedEvent } from '../events'

import { Room } from '@service-chat/domain/entities/room.entity'
import { RedisRepository } from '@service-chat/infrastucture/repository/chat.repository'
import { CreateRoomRequest } from '@chat/proto'

export class CreateRoomCommand implements ICommand {
  constructor(public readonly req: CreateRoomRequest) {}
}

@CommandHandler(CreateRoomCommand)
export class CreateRoomHandler implements ICommandHandler<CreateRoomCommand> {
  constructor(
    private readonly repository: RedisRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateRoomCommand) {
    Logger.log('CreateRoomHandler', 'CreateRoomCommand')

    const {
      req: { members },
    } = command

    const result = await this.repository.createRoom({ members })

    if (result) {
      const room = this.publisher.mergeObjectContext(
        new Room(
          result.id,
          result.members,
          result.blocked,
          result.typing,
          result.seenBy,
        ),
      )

      room.publish(new RoomCreatedEvent(room as any))
      room.commit()

      return room
    }
  }
}
