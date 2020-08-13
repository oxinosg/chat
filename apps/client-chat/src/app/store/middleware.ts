import socketIOClient from 'socket.io-client'
import { MiddlewareAPI } from 'redux'

export const IO_CONNECT = 'IO_CONNECT'
export const IO_CONNECTING = 'IO_CONNECTING'
export const IO_CONNECTED = 'IO_CONNECTED'
export const IO_DISCONNECT = 'IO_DISCONNECT'
export const IO_DISCONNECTED = 'IO_DISCONNECTED'
export const IO_EMIT = 'IO_EMIT'
export const IO_REGISTER = 'IO_REGISTER'
export const IO_DEREGISTER = 'IO_DEREGISTER'

interface IoConnectAction {
  type: typeof IO_CONNECT
  payload: {
    userName: string
  }
}

interface IoConnectingAction {
  type: typeof IO_CONNECTING
}

interface IoConnectedAction {
  type: typeof IO_CONNECTED
}

interface IoDisconnectAction {
  type: typeof IO_DISCONNECT
}

interface IoDisconnectedAction {
  type: typeof IO_DISCONNECTED
}

interface IoEmitAction {
  type: typeof IO_EMIT
  payload: {
    eventName: string
    args?: any
    callback: (response: any) => void
  }
}

interface IoRegisterAction {
  type: typeof IO_REGISTER
  payload: {
    eventName: string
    callback: (response: any) => void
  }
}

interface IoDeregisterAction {
  type: typeof IO_DEREGISTER
}

export type IoActionTypes =
  | IoConnectAction
  | IoConnectingAction
  | IoConnectedAction
  | IoDisconnectAction
  | IoDisconnectedAction
  | IoEmitAction
  | IoRegisterAction
  | IoDeregisterAction

// TypeScript infers that this function is returning the correct action
export function ioConnect(userName: string): IoActionTypes {
  return {
    type: IO_CONNECT,
    payload: { userName },
  }
}

export function ioConnecting(): IoActionTypes {
  return {
    type: IO_CONNECTING,
  }
}

export function ioConnected(): IoActionTypes {
  return {
    type: IO_CONNECTED,
  }
}

export function ioDisconnect(): IoActionTypes {
  return {
    type: IO_DISCONNECT,
  }
}

export function ioDisconnected(): IoActionTypes {
  return {
    type: IO_DISCONNECTED,
  }
}

export function ioEmit({ eventName, args, callback }): IoActionTypes {
  return {
    type: IO_EMIT,
    payload: {
      eventName,
      callback,
      args,
    },
  }
}

export function ioRegister(
  eventName: string,
  callback: (response: any) => void,
): IoActionTypes {
  return {
    type: IO_REGISTER,
    payload: {
      eventName,
      callback,
    },
  }
}

export function ioReducer(state = {}, action: IoActionTypes) {
  debugger
  return state
}

export function socketMiddleware(host: string) {
  let socket = null

  // the middleware part of this function
  return (store: MiddlewareAPI<any, any>) => {
    return (next: (action: any) => void) => (action: IoActionTypes) => {
      switch (action.type) {
        case IO_CONNECT:
          if (socket !== null) {
            socket.close()
          }

          socket = socketIOClient(host, {
            query: {
              user: action.payload.userName,
            },
          })

          break
        case IO_DISCONNECT:
          if (socket !== null) {
            socket.close()
          }
          socket = null
          console.log('websocket closed')
          break
        case IO_EMIT:
          if (!!action.payload.args) {
            socket.emit(
              action.payload.eventName,
              action.payload.args,
              (response: any) => {
                action.payload.callback(response)
              },
            )
          } else {
            socket.emit(action.payload.eventName, (response: any) => {
              action.payload.callback(response)
            })
          }
          break
        case IO_REGISTER:
          socket.on(action.payload.eventName, (data: any) => {
            console.log(data)
            action.payload.callback(data)
          })
          break
        case IO_DEREGISTER:
          break
        default:
          return next(action)
      }
    }
  }
}
