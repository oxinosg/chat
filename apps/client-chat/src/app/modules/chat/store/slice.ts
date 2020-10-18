import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from '@reduxjs/toolkit'
import sortBy from 'lodash.sortby'

import { Message, Room, User } from './types'

const usersAdapter = createEntityAdapter<User>()
const roomsAdapter = createEntityAdapter<Room>()

export const usersSelectors = usersAdapter.getSelectors()
export const roomsSelectors = roomsAdapter.getSelectors()

interface UserReceivedPayload {
  user?: User
  rooms?: Room[]
}

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    users: usersAdapter.getInitialState(),
    rooms: roomsAdapter.getInitialState(),
    selectedRoom: null,
    userReceived: false,
  },
  reducers: {
    messageReceived: (state, action: PayloadAction<Message>) =>
      void roomsSelectors
        .selectById(state.rooms, state.selectedRoom)
        .messages.push(action.payload),
    userReceived: (state, action: PayloadAction<UserReceivedPayload>) => {
      const { user, rooms } = action.payload
      if (user) {
        usersAdapter.upsertOne(state.users, user)
      }
      if (rooms) {
        roomsAdapter.upsertMany(state.rooms, rooms)
      }
      state.userReceived = true
    },
    roomReceived: (state, action: PayloadAction<Room>) => {
      roomsAdapter.upsertOne(state.rooms, {
        ...action.payload,
        messages: sortBy(action.payload.messages, 'time'),
      })
    },
    selectRoom: (state, action: PayloadAction<string>) =>
      void (state.selectedRoom = action.payload),
  },
})

export const {
  messageReceived,
  roomReceived,
  selectRoom,
  userReceived,
} = chatSlice.actions

export default chatSlice.reducer
