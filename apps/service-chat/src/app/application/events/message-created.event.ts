import { IEventHandler, IEvent, EventsHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'

import { CreateMessageResponse } from '@chat/proto'

export class MessageCreatedEvent implements IEvent {
  constructor(public readonly message: CreateMessageResponse) {}
}

@EventsHandler(MessageCreatedEvent)
export class MessageCreatedHandler
  implements IEventHandler<MessageCreatedEvent> {
  handle(event: MessageCreatedEvent) {
    Logger.log(event, 'MessageCreatedEvent')
  }
}
