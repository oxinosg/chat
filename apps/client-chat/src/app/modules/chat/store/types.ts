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
  content: string
  time: string
  file?: string
}

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
