import { Message as MessageEntity } from '../entities/message.entity'
import { Room as RoomEntity } from '../entities/room.entity'
import { User as UserEntity } from '../entities/user.entity'

export interface ChatContract {
  createRoom(arg: CreateRoomInput): CreateRoomResponse
  createMessage(arg: CreateMessageInput): CreateMessageResponse
  createUser(arg: CreateUserInput): CreateUserResponse
  userDisconnect(arg: UserDisconnectInput): UserDisconnectResponse
  getUserAndRoomMeta(arg: GetUserInput): GetUserResponse
  getUsersSocketIds(arg: GetUsersConnectionsInput): GetUsersConnectionsResponse
  getRoom(arg: GetRoomInput): GetUserResponse
}

export type Ok = 'OK'

export interface Message {
  id: MessageEntity['id']
  content: MessageEntity['content']
  sender: MessageEntity['sender']
  time: MessageEntity['time']
  file?: MessageEntity['file']
}

export interface BaseRoom {
  id: RoomEntity['id']
  members: RoomEntity['members']
}

export interface Room extends BaseRoom {
  messages: Message[]
  blocked: RoomEntity['blocked']
  typing: RoomEntity['typing']
  seenBy: RoomEntity['seenBy']
}

export enum Status {
  online = 'online',
  offline = 'offline',
  idle = 'idle',
  busy = 'busy',
}

export interface User {
  id: UserEntity['id']
  socketId: UserEntity['socketId']
  rooms: UserEntity['rooms']
  blocked: UserEntity['blocked']
  status: Status
}

export interface GetUserInput {
  userId: string
}

export interface GetUserResponse {
  user: User
  rooms: BaseRoom[]
}

export interface GetRoomInput {
  roomId: string
}

export interface GetRoomResponse extends Room {}

export interface CreateMessageInput {
  userId: string
  roomId: string
  content: string
  file?: string
}

export interface CreateMessageResponse extends Message {}

export interface CreateRoomInput {
  members: string[]
}

export interface CreateRoomResponse extends Room {}

export interface CreateUserInput {
  userId: string
  socketId: string
}

export interface CreateUserResponse {
  id: string
  socketId: string
}

export interface UserDisconnectInput {
  userId: string
}

export interface UserDisconnectResponse {
  userId: string
}

export interface GetUsersConnectionsInput {
  userIds: string[]
}

export interface GetUsersConnectionsResponse {
  users: CreateUserResponse[]
}
