import React from 'react'
import { format, isSameDay, parseISO } from 'date-fns'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

import { MessageList } from 'react-chat-elements'

import { RootState } from '../../../../../main'
import { roomsSelectors } from '../../store'

const ChatMessageList = ({ userName, selectedRoom }) => {
  const { rooms: roomsEntityState } = useSelector(
    (state: RootState) => state.chat,
  )
  const roomEntities = roomsSelectors.selectEntities(roomsEntityState)

  function getDateString(date: string) {
    return format(parseISO(date), 'HH:mm')
  }

  const messages = roomEntities[selectedRoom]?.messages
  const messageList = []

  messages &&
    messages.map((message, i) => {
      if (
        i === 0 ||
        (messages[i + 1] &&
          !isSameDay(parseISO(message.time), parseISO(messages[i + 1].time)))
      ) {
        messageList.push({
          text: format(parseISO(message.time), 'MMM d, yyyy'),
          type: 'system',
          notch: false,
        })
      }

      // TODO add read status later `message.read`
      messageList.push({
        id: message.id,
        text: parse(message.content),
        type: 'text',
        position: message.sender !== userName ? 'left' : 'right',
        status:
          i !== 0 || message.sender !== userName
            ? ''
            : '' // message.read
            ? 'read'
            : '',
        notch: false,
        dateString: getDateString(message.time),
      })
    })

  return <MessageList lockable={true} dataSource={messageList} />
}

export default ChatMessageList
