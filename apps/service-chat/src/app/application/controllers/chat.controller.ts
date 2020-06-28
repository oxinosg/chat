import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod } from '@nestjs/microservices'

import {
  CreateMessageRequest,
  CreateMessageResponse,
  CreateRoomRequest,
  CreateRoomResponse,
  CreateUserRequest,
  CreateUserResponse,
  UserDisconnectRequest,
  UserDisconnectResponse,
  GetRoomRequest,
  GetRoomResponse,
  GetUserRequest,
  GetUserResponse,
  GetUsersConnectionsRequest,
  GetUsersConnectionsResponse,
} from '@chat/proto'
import {
  GetRoomQuery,
  GetUserAndRoomMetaQuery,
  GetUsersConnectionsQuery,
} from '../queries'
import {
  CreateUserCommand,
  CreateMessageCommand,
  CreateRoomCommand,
  UserDisconnectedCommand,
} from '../commands'

@Controller('chat')
export class ChatController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod('ChatService')
  getUserAndRoomMeta(data: GetUserRequest): Promise<GetUserResponse> {
    return this.queryBus.execute(new GetUserAndRoomMetaQuery(data))
  }

  @GrpcMethod('ChatService')
  getRoom(data: GetRoomRequest): Promise<GetRoomResponse> {
    return this.queryBus.execute(new GetRoomQuery(data))
  }

  @GrpcMethod('ChatService')
  getUsersConnections(
    data: GetUsersConnectionsRequest,
  ): Promise<GetUsersConnectionsResponse> {
    return this.queryBus.execute(new GetUsersConnectionsQuery(data))
  }

  @GrpcMethod('ChatService')
  createMessage(data: CreateMessageRequest): Promise<CreateMessageResponse> {
    return this.commandBus.execute(new CreateMessageCommand(data))
  }

  @GrpcMethod('ChatService')
  createRoom(data: CreateRoomRequest): Promise<CreateRoomResponse> {
    return this.commandBus.execute(new CreateRoomCommand(data))
  }

  @GrpcMethod('ChatService')
  createUser(data: CreateUserRequest): Promise<CreateUserResponse> {
    return this.commandBus.execute(new CreateUserCommand(data))
  }

  @GrpcMethod('ChatService')
  userDisconnect(data: UserDisconnectRequest): Promise<UserDisconnectResponse> {
    return this.commandBus.execute(new UserDisconnectedCommand(data))
  }
}
