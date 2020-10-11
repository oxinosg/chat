import { put, takeEvery, all } from 'redux-saga/effects'

import { ioEmit, ioConnect, ioRegister } from '../../../store/middleware'
import {
  connectChat,
  getUser,
  newRoomReceived,
  createRoom,
  sendMessage,
} from './actions'
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
        callbackAction: (data) => messageReceived(data),
      }),
    ),
    put(
      ioRegister({
        eventName: 'new_room',
        callbackAction: (data) => newRoomReceived(data),
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
      callbackAction: (res: any) => userReceived(res),
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
      callbackAction: (res: any) => roomReceived(res),
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
      callbackAction: (res: any) => roomReceived(res),
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
      callbackAction: (res: any) => messageReceived(res),
    }),
  )
}

export function* rootSaga() {
  yield takeEvery(connectChat.type, handleConnectChat)
  yield takeEvery(createRoom.type, handleCreateRoom)
  yield takeEvery(sendMessage.type, handleSendMessage)
  yield takeEvery(selectRoom.type, handleGetRoom)
  yield takeEvery([getUser.type, newRoomReceived.type], handleGetUser)
}
