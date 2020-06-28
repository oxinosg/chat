import {
  ChatActionTypes,
  Message,
  User,
  Room,
  GET_USER,
  GET_ROOM,
  GET_ROOMS,
  GET_MESSAGE,
  CREATE_ROOM,
  JOIN_ROOM,
  SELECT_ROOM,
} from './types'

// TypeScript infers that this function is returning GetMessageAction
export function getMessage(message: Message): ChatActionTypes {
  return {
    type: GET_MESSAGE,
    payload: message,
  }
}

export function getUser(user: User): ChatActionTypes {
  return {
    type: GET_USER,
    payload: {
      id: user.id,
      status: user.status,
      blocked: user.blocked || [],
      rooms: user.rooms || [],
    },
  }
}

export function getRoom(room: Room): ChatActionTypes {
  return {
    type: GET_ROOM,
    payload: room,
  }
}

export function getRooms(rooms: Room[]): ChatActionTypes {
  return {
    type: GET_ROOMS,
    payload: rooms || [],
  }
}

export function createRoom(room: Room): ChatActionTypes {
  return {
    type: CREATE_ROOM,
    payload: {
      id: room.id,
      members: room.members || [],
      messages: room.messages || [],
      blocked: room.blocked || [],
      typing: room.typing || [],
      seenBy: room.seenBy || {},
    },
  }
}

export function joinRoom(room: Room): ChatActionTypes {
  return {
    type: JOIN_ROOM,
    payload: room,
  }
}

export function selectRoom(id: string): ChatActionTypes {
  return {
    type: SELECT_ROOM,
    payload: id,
  }
}
