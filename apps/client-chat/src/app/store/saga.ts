import { spawn, put, takeEvery, all } from 'redux-saga/effects'

import { ioEmit, ioConnect, ioRegister } from './middleware'
import {
  GET_USER,
  CREATE_ROOM,
  CHAT_CONNECT,
  NEW_ROOM_RECEIVED,
  SEND_MESSAGE,
  SELECT_ROOM,
  ConnectChatAction,
  CreateRoomAction,
  GetUserAction,
  SendMessageAction,
  SelectRoomAction,
} from './types'
import {
  roomReceived,
  userReceived,
  messageReceived,
  newRoomReceived,
} from './actions'

// TODO add error handlers and data validators based on contracts

function* handleConnectChat(action: ConnectChatAction): Generator {
  yield put(ioConnect(action.payload.userName))
  yield all([
    put(ioRegister('message', (data) => messageReceived(data))),
    put(ioRegister('new_room', (data) => newRoomReceived(data))),
  ])
}

function* handleGetUser(action: GetUserAction): Generator {
  yield put(
    ioEmit('getUserAndRoomMeta', (res: any) => userReceived(res), {
      userId: action.payload.userId,
    }),
  )
}

function* handleGetRoom(action: SelectRoomAction): Generator {
  yield put(
    ioEmit('getRoom', (res: any) => roomReceived(res), {
      roomId: action.payload,
    }),
  )
}

function* handleCreateRoom(action: CreateRoomAction): Generator {
  yield put(
    ioEmit('createRoom', (res: any) => roomReceived(res), {
      members: action.payload.members,
    }),
  )
}

function* handleSendMessage(action: SendMessageAction): Generator {
  yield put(
    ioEmit('sendMessage', (res: any) => messageReceived(res), {
      userId: action.payload.userId,
      roomId: action.payload.roomId,
      content: action.payload.content,
    }),
  )
}

function* watchCreateRoom(): Generator {
  yield takeEvery(CHAT_CONNECT, handleConnectChat)
  yield takeEvery(CREATE_ROOM, handleCreateRoom)
  yield takeEvery(SEND_MESSAGE, handleSendMessage)
  yield takeEvery(SELECT_ROOM, handleGetRoom)
  yield takeEvery([GET_USER, NEW_ROOM_RECEIVED], handleGetUser)
}

export default function* rootSaga() {
  yield spawn(watchCreateRoom)
}
