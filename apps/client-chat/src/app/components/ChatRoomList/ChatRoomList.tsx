import React from 'react'
import { format, isSameDay, isSameYear, parseISO } from 'date-fns'
import { useSelector } from 'react-redux'

import { ChatList } from 'react-chat-elements'

import { RootState } from '../../store/reducers'
import identicon from 'identicon.js'

type IProps = {
  classes: any
  userName: string
  selectedRoom: string
  onClick: () => void
}

const ChatRoomList = ({ classes, userName, onClick, selectedRoom }: IProps) => {
  const { rooms, users } = useSelector((state: RootState) => state.chat)

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
  if (userName && rooms.allIds.length > 0) {
    chatList = rooms.allIds.map((roomId) => {
      const room = rooms.byId[roomId] || {}
      const messages = rooms.byId[roomId]?.messages
      const lastMessage =
        messages && messages.length > 0 && messages[0] === room.id
          ? messages[0]
          : room.messages &&
            Array.isArray(room.messages) &&
            room.messages.length > 0
          ? room.messages[0]
          : {}

      const unread = !lastMessage.read && lastMessage.receiver === userName

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
        messageReceiver: lastMessage.receiver,
      }
    })
  }

  return <ChatList onClick={onClick} dataSource={chatList} />
}

export default ChatRoomList
