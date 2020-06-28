import { CreateUserHandler, CreateUserCommand } from './create-user.command'
import {
  CreateMessageHandler,
  CreateMessageCommand,
} from './create-message.command'
import { CreateRoomHandler, CreateRoomCommand } from './create-room.command'
import {
  UserDisconnectedHandler,
  UserDisconnectedCommand,
} from './user-disconnected.command'

export {
  CreateUserCommand,
  CreateMessageCommand,
  CreateRoomCommand,
  UserDisconnectedCommand,
}

export const CommandHandlers = [
  CreateUserHandler,
  CreateRoomHandler,
  CreateMessageHandler,
  UserDisconnectedHandler,
]
