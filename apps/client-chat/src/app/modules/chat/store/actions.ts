// This file only contains actions which are used by redux-sagas (effects.ts)

import { createAction } from '@reduxjs/toolkit'
import { Message, Room } from './types'

interface SendMessagePayload {
  userId: string
  roomId: string
  content: string
}

const getUser = createAction<string>('ws/getUser')
const createRoom = createAction<string[]>('ws/createRoom')
const newRoomReceived = createAction<Room>('ws/newRoomReceived')
const messageReceived = createAction<Message>('ws/messageReceived')
const sendMessage = createAction<SendMessagePayload>('ws/sendMessage')
const joinRoom = createAction<Room>('ws/joinRoom')
const connectChat = createAction<string>('ws/connectChat')
const disconnectChat = createAction('ws/disconnectChat')

export {
  getUser,
  createRoom,
  newRoomReceived,
  messageReceived,
  sendMessage,
  joinRoom,
  connectChat,
  disconnectChat,
}
