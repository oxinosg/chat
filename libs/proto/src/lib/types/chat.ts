import { Observable } from 'rxjs'

import {
  ChatContract,
  GetUserInput as GetUserRequest,
  GetUserResponse,
  GetRoomInput as GetRoomRequest,
  GetRoomResponse,
  CreateMessageInput as CreateMessageRequest,
  CreateMessageResponse,
  CreateRoomInput as CreateRoomRequest,
  CreateRoomResponse,
  CreateUserInput as CreateUserRequest,
  CreateUserResponse,
  UserDisconnectInput as UserDisconnectRequest,
  UserDisconnectResponse,
  GetUsersConnectionsInput as GetUsersConnectionsRequest,
  GetUsersConnectionsResponse,
  LoadPublicResponse,
  BaseRoom,
  Message,
  Ok,
  Room,
  Status,
  User,
} from '@chat/contracts'

type Diff<T extends keyof any, U extends keyof any> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T]
type Overwrite<T, U> = Pick<T, Diff<keyof T, keyof U>> & U

interface ChatServiceOverwrite {
  getUserAndRoomMeta(req: GetUserRequest): Observable<GetUserResponse>
  getRoom(req: GetRoomRequest): Observable<GetRoomResponse>
  createMessage(req: CreateMessageRequest): Observable<CreateMessageResponse>
  createRoom(req: CreateRoomRequest): Observable<CreateRoomResponse>
  createUser(req: CreateUserRequest): Observable<CreateUserResponse>
  userDisconnect(req: UserDisconnectRequest): Observable<UserDisconnectResponse>
  getUsersConnections(
    req: GetUsersConnectionsRequest,
  ): Observable<GetUsersConnectionsResponse>
  loadPublic(): Observable<LoadPublicResponse>
}

export interface ChatService
  extends Overwrite<ChatContract, ChatServiceOverwrite> {}

export {
  ChatContract,
  GetUserRequest,
  GetUserResponse,
  GetRoomRequest,
  GetRoomResponse,
  CreateMessageRequest,
  CreateMessageResponse,
  CreateRoomRequest,
  CreateRoomResponse,
  CreateUserRequest,
  CreateUserResponse,
  UserDisconnectRequest,
  UserDisconnectResponse,
  GetUsersConnectionsRequest,
  GetUsersConnectionsResponse,
  LoadPublicResponse,
  BaseRoom,
  Message,
  Ok,
  Room,
  Status,
  User,
}
