import { IEventHandler, IEvent, EventsHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'

import { CreateRoomResponse } from '@chat/proto'

export class RoomCreatedEvent implements IEvent {
  constructor(public readonly room: CreateRoomResponse) {}
}

@EventsHandler(RoomCreatedEvent)
export class RoomCreatedHandler implements IEventHandler<RoomCreatedEvent> {
  handle(event: RoomCreatedEvent) {
    Logger.log(event, 'RoomCreatedEvent')
  }
}
