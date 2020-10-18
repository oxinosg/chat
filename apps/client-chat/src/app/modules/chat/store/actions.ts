// This file only contains actions which are used by redux-sagas (effects.ts)

// TODO move all in sagsa just to make their handlers more discoverable
import { createAction } from '@reduxjs/toolkit'
import { Room } from './types'

interface SendMessagePayload {
  userId: string
  roomId: string
  content: string
}

const getUser = createAction<string>('ws/getUser')
const createRoom = createAction<string[]>('ws/createRoom')
// const newRoomReceived = createAction<Room>('ws/newRoomReceived')
const sendMessage = createAction<SendMessagePayload>('ws/sendMessage')
const joinRoom = createAction<Room>('ws/joinRoom')
const connectChat = createAction<string>('ws/connectChat')
const disconnectChat = createAction('ws/disconnectChat')

export {
  getUser,
  createRoom,
  // newRoomReceived,
  sendMessage,
  joinRoom,
  connectChat,
  disconnectChat,
}
