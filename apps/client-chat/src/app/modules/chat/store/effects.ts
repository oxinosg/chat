import { put, takeEvery, all } from 'redux-saga/effects'

import { ioEmit, ioConnect, ioRegister } from '../../../store/middleware'
import {
  connectChat,
  getUser,
  messageReceived,
  newRoomReceived,
  createRoom,
  sendMessage,
} from './actions'
import { selectRoom, userReceived, roomReceived } from './slice'

// TODO add error handlers and data validators based on contracts

function* handleConnectChat(action: ReturnType<typeof connectChat>): Generator {
  console.log('==========')
  console.log('handleConnectChat')
  console.log('==========')
  yield put(ioConnect(action.payload))
  yield all([
    put(ioRegister('message', (data) => messageReceived(data))),
    put(ioRegister('new_room', (data) => newRoomReceived(data))),
  ])
}

function* handleGetUser(action: ReturnType<typeof getUser>): Generator {
  console.log('==========')
  console.log('handleGetUser')
  console.log('==========')
  yield put(
    ioEmit('getUserAndRoomMeta', (res: any) => userReceived(res), {
      userId: action.payload,
    }),
  )
}

function* handleGetRoom(action: ReturnType<typeof selectRoom>): Generator {
  console.log('==========')
  console.log('handleGetRoom')
  console.log('==========')
  yield put(
    ioEmit('getRoom', (res: any) => roomReceived(res), {
      roomId: action.payload,
    }),
  )
}

function* handleCreateRoom(action: ReturnType<typeof createRoom>): Generator {
  console.log('==========')
  console.log('handleCreateRoom')
  console.log('==========')
  yield put(
    ioEmit('createRoom', (res: any) => roomReceived(res), {
      members: action.payload,
    }),
  )
}

function* handleSendMessage(action: ReturnType<typeof sendMessage>): Generator {
  console.log('==========')
  console.log('handleSendMessage')
  console.log('==========')
  yield put(
    ioEmit('sendMessage', (res: any) => messageReceived(res), {
      userId: action.payload.userId,
      roomId: action.payload.roomId,
      content: action.payload.content,
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
