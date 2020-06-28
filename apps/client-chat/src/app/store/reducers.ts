import { combineReducers } from 'redux'
import produce from 'immer'
import sortBy from 'lodash.sortby'

import {
  ChatActionTypes,
  ChatState,
  GET_USER,
  GET_ROOM,
  GET_ROOMS,
  GET_MESSAGE,
  CREATE_ROOM,
  JOIN_ROOM,
  SELECT_ROOM,
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
}

export function chatReducer(
  state = initialState,
  action: ChatActionTypes,
): ChatState {
  switch (action.type) {
    case GET_MESSAGE:
      return produce(state, (draftState) => {
        draftState.rooms.byId[state.selectedRoom].messages.push(action.payload)
      })

    case GET_USER:
      console.log('rooms')
      console.log(action)
      return {
        ...state,
        users: {
          byId: {
            ...state.users.byId,
            [action.payload.id]: action.payload,
          },
          allIds: [...state.users.allIds, action.payload.id],
        },
        rooms: {
          byId: {
            ...state.rooms.byId,
            ...action.payload.rooms.reduce((obj, curr) => {
              obj[curr] = null
              return obj
            }, {}),
          },
          allIds: [...state.rooms.allIds, ...action.payload.rooms],
        },
      }

    case GET_ROOM: {
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
