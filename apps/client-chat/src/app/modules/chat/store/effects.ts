import { put, takeEvery, all } from 'redux-saga/effects'

import {
  CreateMessageResponse,
  GetUserResponse,
  GetRoomResponse,
  CreateRoomResponse,
} from '@chat/contracts'

import { ioEmit, ioConnect, ioRegister } from '../../../store/middleware'
import { connectChat, getUser, createRoom, sendMessage } from './actions'
import {
  selectRoom,
  userReceived,
  messageReceived,
  roomReceived,
} from './slice'

// TODO add error handlers and data validators based on contracts

function* handleConnectChat(action: ReturnType<typeof connectChat>): Generator {
  yield put(ioConnect(action.payload))
  yield all([
    put(
      ioRegister({
        eventName: 'message',
        callbackAction: (data: CreateMessageResponse) => messageReceived(data),
      }),
    ),
    put(
      ioRegister({
        eventName: 'new_room',
        callbackAction: (data: CreateRoomResponse) => roomReceived(data),
      }),
    ),
  ])
}

function* handleGetUser(action: ReturnType<typeof getUser>): Generator {
  yield put(
    ioEmit({
      eventName: 'getUserAndRoomMeta',
      args: {
        userId: action.payload,
      },
      callbackAction: (res: GetUserResponse) => userReceived(res),
    }),
  )
}

function* handleGetRoom(action: ReturnType<typeof selectRoom>): Generator {
  yield put(
    ioEmit({
      eventName: 'getRoom',
      args: {
        roomId: action.payload,
      },
      callbackAction: (res: GetRoomResponse) => roomReceived(res),
    }),
  )
}

function* handleCreateRoom(action: ReturnType<typeof createRoom>): Generator {
  yield put(
    ioEmit({
      eventName: 'createRoom',
      args: {
        members: action.payload,
      },
      callbackAction: (res: CreateRoomResponse) => roomReceived(res),
    }),
  )
}

function* handleSendMessage(action: ReturnType<typeof sendMessage>): Generator {
  yield put(
    ioEmit({
      eventName: 'sendMessage',
      args: {
        userId: action.payload.userId,
        roomId: action.payload.roomId,
        content: action.payload.content,
      },
      callbackAction: (res: CreateMessageResponse) => messageReceived(res),
    }),
  )
}

export function* rootSaga() {
  yield takeEvery(connectChat.type, handleConnectChat)
  yield takeEvery(createRoom.type, handleCreateRoom)
  yield takeEvery(sendMessage.type, handleSendMessage)
  yield takeEvery(selectRoom.type, handleGetRoom)
  yield takeEvery(getUser.type, handleGetUser)
}
