enum Status {
  online = 'online',
  offline = 'offline',
  idle = 'idle',
  busy = 'busy',
}

export interface User {
  id: string
  status: Status
  blocked: string[]
  rooms: string[]
}

export interface Room {
  id: string
  members: string[]
  messages: Message[]
  blocked: string[]
  typing: string[]
  seenBy: { [key: string]: string }
}

export interface Message {
  id: string
  sender: string
  message: string
  timestamp: number
  file?: string
}

export const GET_MESSAGE = 'GET_MESSAGE'
export const GET_USER = 'GET_USER'
export const GET_ROOM = 'GET_ROOM'
export const GET_ROOMS = 'GET_ROOMS'
export const CREATE_ROOM = 'CREATE_ROOM'
export const JOIN_ROOM = 'JOIN_ROOM'
export const SELECT_ROOM = 'SELECT_ROOM'

interface GetMessageAction {
  type: typeof GET_MESSAGE
  payload: Message
}

interface GetUserAction {
  type: typeof GET_USER
  payload: User
}

interface GetRoomAction {
  type: typeof GET_ROOM
  payload: Room
}

interface GetRoomsAction {
  type: typeof GET_ROOMS
  payload: Room[]
}

interface CreateRoomAction {
  type: typeof CREATE_ROOM
  payload: Room
}

interface JoinRoomAction {
  type: typeof JOIN_ROOM
  payload: Room
}

interface SelectRoomAction {
  type: typeof SELECT_ROOM
  payload: string
}

export type ChatActionTypes =
  | GetMessageAction
  | GetUserAction
  | GetRoomAction
  | GetRoomsAction
  | CreateRoomAction
  | JoinRoomAction
  | SelectRoomAction

export interface ChatState {
  users: {
    allIds: string[]
    byId: { [key: string]: User }
  }
  rooms: {
    allIds: string[]
    byId: { [key: string]: Room }
  }
  selectedRoom: string | null
}
