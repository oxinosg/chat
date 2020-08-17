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

export const GET_USER = 'GET_USER'
export const CREATE_ROOM = 'CREATE_ROOM'
export const JOIN_ROOM = 'JOIN_ROOM'
export const SELECT_ROOM = 'SELECT_ROOM'

export const CHAT_CONNECT = 'CHAT_CONNECT'
export const CHAT_DISCONNECT = 'CHAT_DISCONNECT'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const NEW_MESSAGE_RECEIVED = 'NEW_MESSAGE_RECEIVED'
export const NEW_ROOM_RECEIVED = 'NEW_ROOM_RECEIVED'
export const USER_RECEIVED = 'USER_RECEIVED'
export const ROOM_RECEIVED = 'ROOM_RECEIVED'

export interface ConnectChatAction {
  type: typeof CHAT_CONNECT
  payload: {
    userName: string
  }
}

export interface DisconnectChatAction {
  type: typeof CHAT_DISCONNECT
}

export interface GetUserAction {
  type: typeof GET_USER
  payload: {
    userId: string
  }
}

export interface SendMessageAction {
  type: typeof SEND_MESSAGE
  payload: {
    userId: string
    roomId: string
    content: string
  }
}

export interface CreateRoomAction {
  type: typeof CREATE_ROOM
  payload: {
    members: string[]
  }
}

export interface JoinRoomAction {
  type: typeof JOIN_ROOM
  payload: Room
}

export interface SelectRoomAction {
  type: typeof SELECT_ROOM
  payload: string
}

export interface UserReceivedAction {
  type: typeof USER_RECEIVED
  payload: {
    user?: User
    rooms?: string[]
  }
}

export interface RoomReceivedAction {
  type: typeof ROOM_RECEIVED
  payload: Room
}

export interface NewRoomReceivedAction {
  type: typeof NEW_ROOM_RECEIVED
  payload: Room
}

export interface MessageReceivedAction {
  type: typeof NEW_MESSAGE_RECEIVED
  payload: Message
}

export type ChatActions =
  | GetUserAction
  | CreateRoomAction
  | JoinRoomAction
  | SelectRoomAction
  | RoomReceivedAction
  | NewRoomReceivedAction
  | MessageReceivedAction
  | UserReceivedAction
  | SendMessageAction
  | ConnectChatAction
  | DisconnectChatAction

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
  userReceived: boolean
}
