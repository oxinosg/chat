import { UserCreatedHandler, UserCreatedEvent } from './user-created.event'
import { RoomCreatedHandler, RoomCreatedEvent } from './room-created.event'
import {
  MessageCreatedHandler,
  MessageCreatedEvent,
} from './message-created.event'
import {
  UserDisconnectedHandler,
  UserDisconnectedEvent,
} from './user-disconnected.event'

export {
  UserCreatedEvent,
  RoomCreatedEvent,
  MessageCreatedEvent,
  UserDisconnectedEvent,
}

export const EventHandlers = [
  UserCreatedHandler,
  RoomCreatedHandler,
  MessageCreatedHandler,
  UserDisconnectedHandler,
]
