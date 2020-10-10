import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import sortBy from 'lodash.sortby'

import { ChatState, Message, Room, User } from './types'

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

interface UserReceivedPayload {
  user?: User
  rooms?: string[]
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    newMessageReceived: (state, action: PayloadAction<Message>) =>
      void state.rooms.byId[state.selectedRoom].messages.push(action.payload),
    userReceived: (state, action: PayloadAction<UserReceivedPayload>) => {
      const { user, rooms } = action.payload
      if (user) {
        state.users.byId[user.id] = user
        if (!state.users.allIds.includes(user.id)) {
          state.users.allIds.push(user.id)
        }
      }
      if (rooms) {
        rooms.map((roomId) => {
          if (!state.rooms.byId[roomId]) {
            state.rooms.byId[roomId] = null
          }
          if (!state.rooms.allIds.includes(roomId)) {
            state.rooms.allIds.push(roomId)
          }
        })
      }
    },
    roomReceived: (state, action: PayloadAction<Room>) => {
      state.rooms.byId[action.payload.id] = {
        ...action.payload,
        messages: sortBy(action.payload.messages, 'time'),
      }
      if (!state.rooms.allIds.includes(action.payload.id)) {
        state.rooms.allIds.push(action.payload.id)
      }
    },
    selectRoom: (state, action: PayloadAction<string>) =>
      void (state.selectedRoom = action.payload),
  },
})

export const {
  newMessageReceived,
  roomReceived,
  selectRoom,
  userReceived,
} = chatSlice.actions

export default chatSlice.reducer
