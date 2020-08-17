import { combineReducers } from 'redux'
import produce from 'immer'
import sortBy from 'lodash.sortby'

import {
  ChatActions,
  ChatState,
  GET_USER,
  GET_ROOM,
  GET_ROOMS,
  GET_MESSAGE,
  CREATE_ROOM,
  JOIN_ROOM,
  SELECT_ROOM,
  ROOM_RECEIVED,
  USER_RECEIVED,
  NEW_MESSAGE_RECEIVED,
} from './types'

const initialState: ChatState = {
  users: {
    allIds: [],
    byId: {},
  },
  rooms: {
    allIds: [],
    byId: {},
  },
  selectedRoom: null,
  userReceived: false,
}

export function chatReducer(
  state = initialState,
  action: ChatActions,
): ChatState {
  switch (action.type) {
    case NEW_MESSAGE_RECEIVED:
    case GET_MESSAGE:
      return produce(state, (draftState) => {
        draftState.rooms.byId[state.selectedRoom].messages.push(action.payload)
      })
    case USER_RECEIVED:
      return {
        ...state,
        users: {
          byId: {
            ...state.users.byId,
            [action.payload.user.id]: action.payload.user,
          },
          allIds: [...state.users.allIds, action.payload.user.id],
        },
        rooms: {
          byId: {
            ...state.rooms.byId,
            ...action.payload.rooms.reduce((obj, curr) => {
              obj[curr.id] = curr
              return obj
            }, {}),
          },
          allIds: [
            ...state.rooms.allIds,
            ...action.payload.rooms.map((r) => r.id),
          ],
        },
        userReceived: true,
      }

    case ROOM_RECEIVED: {
      const { messages, ...rest } = action.payload

      return {
        ...state,
        rooms: {
          byId: {
            ...state.rooms.byId,
            [action.payload.id]: {
              ...rest,
              messages: sortBy(messages, 'time'),
            },
          },
          allIds: state.rooms.allIds.includes(action.payload.id)
            ? state.rooms.allIds
            : [...state.rooms.allIds, action.payload.id],
        },
        selectedRoom: action.payload.id,
      }
    }

    case GET_ROOMS: {
      const rooms = action.payload.reduce(
        (obj, curr) => {
          if (!state.rooms.byId[curr.id]) {
            if (!state.rooms.allIds.includes(curr.id)) {
              obj.allIds.push(curr.id)
            }
            obj.byId[curr.id] = curr
          }
          return obj
        },
        { byId: {}, allIds: [] },
      )

      return {
        ...state,
        rooms: {
          byId: {
            ...state.rooms.byId,
            ...rooms.byId,
          },
          allIds: [...state.rooms.allIds, ...rooms.allIds],
        },
      }
    }

    case SELECT_ROOM:
      return {
        ...state,
        selectedRoom: action.payload,
      }

    case JOIN_ROOM:
      return state

    default:
      return state
  }
}

// src/store/index.ts
export const rootReducer = combineReducers({
  chat: chatReducer,
})

export type RootState = ReturnType<typeof rootReducer>
