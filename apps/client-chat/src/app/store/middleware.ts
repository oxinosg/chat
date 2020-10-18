import socketIOClient from 'socket.io-client'
import { createAction, MiddlewareAPI } from '@reduxjs/toolkit'

interface IoEmitPayload {
  eventName: string
  callbackAction: any
  args?: any
}

interface IoRegisterPayload {
  eventName: string
  callbackAction: any
}

export const ioConnect = createAction<string, 'io/connect'>('io/connect')
export const ioConnecting = createAction<void, 'io/connecting'>('io/connecting')
export const ioConnected = createAction<void, 'io/connected'>('io/connected')
export const ioDisconnect = createAction<void, 'io/disconnect'>('io/disconnect')
export const ioDisconnected = createAction<void, 'io/disconnected'>(
  'io/disconnected',
)
export const ioEmit = createAction<IoEmitPayload, 'io/emit'>('io/emit')
export const ioRegister = createAction<IoRegisterPayload, 'io/register'>(
  'io/register',
)

type ActionTypes =
  | ReturnType<typeof ioConnect>
  | ReturnType<typeof ioDisconnect>
  | ReturnType<typeof ioEmit>
  | ReturnType<typeof ioRegister>

export function socketMiddleware(host: string) {
  let socket = null

  // the middleware part of this function
  return (store: MiddlewareAPI<any, any>) => {
    return (next: (action: ActionTypes) => void) => (action: ActionTypes) => {
      switch (action.type) {
        case ioConnect.type:
          if (socket !== null) {
            socket.close()
          }

          socket = socketIOClient(host, {
            query: {
              user: action.payload,
            },
          })

          break
        case ioDisconnect.type:
          if (socket !== null) {
            socket.close()
          }
          socket = null
          console.log('websocket closed')
          break
        case ioEmit.type:
          if (!!action.payload.args) {
            socket.emit(
              action.payload.eventName,
              action.payload.args,
              (response: any) => {
                store.dispatch(action.payload.callbackAction(response))
              },
            )
          } else {
            socket.emit(action.payload.eventName, (response: any) => {
              store.dispatch(action.payload.callbackAction(response))
            })
          }

        case ioRegister.type:
          // TODO create interfaces based on contracts and used a validation lib here to verify data
          socket.on(action.payload.eventName, (data: any) => {
            store.dispatch(action.payload.callbackAction(data))
          })
          break
        default:
          return next(action)
      }
    }
  }
}
