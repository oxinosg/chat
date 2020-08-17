import React, { useState, useEffect, useRef } from 'react'
import ctx from 'classnames'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import ChatInput from '../../components/ChatInput'
import ChatMessageList from '../../components/ChatMessageList'
import ChatRoomList from '../../components/ChatRoomList'
import { RootState } from '../../store/reducers'
import {
  getUser as getUserAction,
  selectRoom as selectRoomAction,
  createRoom as createRoomAction,
  connectChat as connectChatAction,
  sendMessage as sendMessageAction,
} from '../../store/actions'

import useStyles from './styles'
import 'react-chat-elements/dist/main.css'

const initialRoomState = {
  selectedRoom: null,
  value: '',
  newMessage: '',
  jobId: '',
  appIsMounted: false,
  roomSet: false,
  creatingRoom: false,
  rooms: [],
}

let creatingRoom = false

const Chat = ({ userName }: { userName: string }) => {
  const classes = useStyles()

  const { rooms, userReceived, selectedRoom } = useSelector(
    (state: RootState) => state.chat,
  )
  const dispatch = useDispatch()

  const [roomsState, setRoomsState] = useState(initialRoomState)
  const params = useParams()

  const inputEl = useRef(null)

  useEffect(() => {
    dispatch(connectChatAction(userName))

    setRoomsState((state) => ({
      ...state,
      roomsLoading: false,
    }))

    dispatch(getUserAction(userName))
  }, [])

  const { receiverId, jobId } = params
  const { roomsLoading, roomSet } = roomsState

  const createMessageLoading = false

  useEffect(() => {
    async function createRoom(receiverId) {
      if (!creatingRoom) {
        creatingRoom = true

        dispatch(createRoomAction([userName, receiverId]))

        setRoomsState((prev) => ({
          ...prev,
          roomSet: true,
        }))
      }
    }

    if (!roomSet && roomsLoading === false && userReceived && receiverId) {
      let room
      if (Array.isArray(rooms.allIds) && rooms.allIds.length > 0) {
        if (receiverId) {
          const tempRoom = rooms.allIds.find(
            (id) =>
              rooms.byId[id] &&
              Array.isArray(rooms.byId[id].members) &&
              rooms.byId[id].members.includes(receiverId),
          )
          if (tempRoom) {
            room = tempRoom
          }
        }

        if (receiverId) {
          if (!room && !roomsState.creatingRoom) {
            createRoom(receiverId)
          } else {
            setRoomsState((prev) => ({
              ...prev,
              roomSet: true,
            }))
            room && selectRoom(room)
          }
        }
      } else {
        if (!roomsState.creatingRoom) {
          createRoom(receiverId)
        }
      }
    }
  }, [roomSet, roomsLoading, receiverId])

  let room
  if (rooms.allIds.length > 0) {
    if (selectedRoom) {
      room = rooms.byId[selectedRoom]
    }
  }

  const messages = rooms.byId[selectedRoom]?.messages

  useEffect(() => {
    const els = document.getElementsByClassName('rce-mlist')
    const el = els.length > 0 && els[0]

    el && el.scrollTo(0, el.scrollHeight)
  }, [messages])

  const createMessage = (value: string) => {
    dispatch(
      sendMessageAction(
        userName,
        selectedRoom,
        value.replace(/^(\s*<br>)*|(<p><br><\/p>\s*)*$/gm, ''),
      ),
    )
  }

  async function selectRoom(room) {
    if (room && room.id) {
      setRoomsState({
        ...roomsState,
        selectedRoom: room.id,
      })

      dispatch(selectRoomAction(room.id))
    }
  }

  const sendMessage = () => {
    const { newMessage } = roomsState

    if (newMessage !== '') {
      createMessage(newMessage)
    }
    inputEl.current && inputEl.current.clear()

    setRoomsState({ ...roomsState, newMessage: '' })
  }

  const handleMessageChange = (e) => {
    const value = typeof e === 'object' ? e.target.value : e

    setRoomsState({
      ...roomsState,
      newMessage: value,
    })
  }

  return (
    <section>
      <Container maxWidth={'lg'}>
        <div className={classes.content}>
          <Grid className={classes.grid} container>
            <Grid className={classes.gridItem} item xs={12} sm={5} md={4}>
              <div className={ctx(classes.item, classes.itemLeft)}>
                <ChatRoomList
                  classes={classes}
                  userName={userName}
                  selectedRoom={selectedRoom}
                  onClick={selectRoom}
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={7} md={8} className={classes.gridItem}>
              <div
                id='messages-wrapper'
                className={ctx(classes.item, classes.itemRight)}>
                <ChatMessageList
                  userName={userName}
                  selectedRoom={roomsState.selectedRoom}
                />
                <div id='chat_input' className={classes.input}>
                  <ChatInput
                    disabled={!selectedRoom}
                    loading={createMessageLoading}
                    inputEl={inputEl}
                    value={roomsState.newMessage}
                    onChange={handleMessageChange}
                    onSend={sendMessage}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  )
}

export default Chat
