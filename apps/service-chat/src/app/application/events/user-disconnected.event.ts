import { IEventHandler, IEvent, EventsHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'

import { UserDisconnectResponse } from '@chat/proto'

export class UserDisconnectedEvent implements IEvent {
  constructor(public readonly user: UserDisconnectResponse) {}
}

@EventsHandler(UserDisconnectedEvent)
export class UserDisconnectedHandler
  implements IEventHandler<UserDisconnectedEvent> {
  handle(event: UserDisconnectedEvent) {
    Logger.log(event, 'UserDisconnectedEvent')
  }
}
