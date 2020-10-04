import {
  ChatActions,
  Message,
  Room,
  CHAT_CONNECT,
  CHAT_DISCONNECT,
  GET_USER,
  CREATE_ROOM,
  JOIN_ROOM,
  SELECT_ROOM,
  ROOM_RECEIVED,
  NEW_ROOM_RECEIVED,
  NEW_MESSAGE_RECEIVED,
  USER_RECEIVED,
  SEND_MESSAGE,
} from './types'

// TypeScript infers that this function is returning GetMessageAction
export function getUser(userName: string): ChatActions {
  return {
    type: GET_USER,
    payload: {
      userId: userName,
    },
  }
}

export function createRoom(members: string[]): ChatActions {
  return {
    type: CREATE_ROOM,
    payload: {
      members,
    },
  }
}

// Type of user/rooms will be specified by TS from ChatActions
export function userReceived({ user, rooms }): ChatActions {
  return {
    type: USER_RECEIVED,
    payload: {
      user: {
        id: user.id,
        status: user.status,
        blocked: user.blocked || [],
        rooms: user.rooms || [],
      },
      rooms: rooms || [],
    },
  }
}

export function roomReceived(room: Room): ChatActions {
  return {
    type: ROOM_RECEIVED,
    payload: room,
  }
}

export function newRoomReceived(room: Room): ChatActions {
  return {
    type: NEW_ROOM_RECEIVED,
    payload: room,
  }
}

export function messageReceived(message: Message): ChatActions {
  return {
    type: NEW_MESSAGE_RECEIVED,
    payload: message,
  }
}

export function sendMessage(
  userId: string,
  roomId: string,
  content: string,
): ChatActions {
  return {
    type: SEND_MESSAGE,
    payload: {
      userId,
      roomId,
      content,
    },
  }
}

export function joinRoom(room: Room): ChatActions {
  return {
    type: JOIN_ROOM,
    payload: room,
  }
}

export function selectRoom(id: string): ChatActions {
  return {
    type: SELECT_ROOM,
    payload: id,
  }
}

export function connectChat(userName): ChatActions {
  return {
    type: CHAT_CONNECT,
    payload: {
      userName,
    },
  }
}

export function disconnectChat(): ChatActions {
  return {
    type: CHAT_DISCONNECT,
  }
}
