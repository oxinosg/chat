import React from 'react'
import { format, isSameDay, isSameYear, parseISO } from 'date-fns'
import { useSelector } from 'react-redux'

import { ChatList } from 'react-chat-elements'

import { Message, roomsSelectors } from '../../store'
import { RootState } from '../../../../../main'
import identicon from 'identicon.js'

type IProps = {
  classes: any
  userName: string
  selectedRoom: string
  onClick: (room: any) => void
}

const ChatRoomList = ({ classes, userName, onClick, selectedRoom }: IProps) => {
  const { rooms: roomsEntityState, users } = useSelector(
    (state: RootState) => state.chat,
  )
  const roomEntities = roomsSelectors.selectEntities(roomsEntityState)
  const roomIds = roomsSelectors.selectIds(roomsEntityState)

  function photo() {
    return new identicon('c157a79031e1c40f85931829bc5fc552').toString()
  }

  function getChatDateString(date: string): string {
    return isSameDay(parseISO(date), new Date())
      ? format(parseISO(date), 'HH:mm')
      : isSameYear(parseISO(date), new Date())
      ? format(parseISO(date), 'd MMM')
      : format(parseISO(date), 'd MMM YYYY')
  }

  let chatList = []
  if (userName && roomIds.length > 0) {
    chatList = roomIds.map((roomId) => {
      const { messages, ...room } = roomEntities[roomId]
      const lastMessage =
        Array.isArray(messages) && messages.length > 0
          ? messages[0]
          : ({} as Message)

      // const unread = !lastMessage.read && lastMessage.sender === userName
      const unread = lastMessage.sender === userName

      let className = ''
      if (room) {
        if (room.id === selectedRoom) {
          className = `${className} ${classes.selectedItem}`
        }
        if (unread) {
          className = `${className} ${classes.unreadItem}`
        }
        if (users[userName] && users[userName].online) {
          className = `${className} ${classes.onlineItem}`
        }
      }

      return {
        id: roomId,
        title: roomId,
        subtitle: '',
        dateString: lastMessage.time
          ? getChatDateString(lastMessage.time)
          : undefined,
        className,
        avatar: `data:image/png;base64,${photo()}`,
        avatarFlexible: true,

        lastMessageId: lastMessage ? lastMessage.id : '',
        messageReceiver: lastMessage.sender,
      }
    })
  }

  console.log(chatList)

  return <ChatList onClick={onClick} dataSource={chatList} />
}

export default ChatRoomList
