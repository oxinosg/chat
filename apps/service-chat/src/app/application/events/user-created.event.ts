import { IEventHandler, IEvent, EventsHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'

import { CreateUserResponse } from '@chat/proto'

export class UserCreatedEvent implements IEvent {
  constructor(public readonly user: CreateUserResponse) {}
}

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  handle(event: UserCreatedEvent) {
    Logger.log(event, 'UserCreatedEvent')
  }
}
