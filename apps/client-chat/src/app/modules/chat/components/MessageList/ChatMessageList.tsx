import React from 'react'
import { format, isSameDay, parseISO } from 'date-fns'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

import Button from '@material-ui/core/Button'
import { MessageList } from 'react-chat-elements'

import { RootState } from '../../store'
import useStyles from './styles'

const ChatMessageList = ({ userName, selectedRoom }) => {
  const { rooms, users } = useSelector((state: RootState) => state.chat)
  const classes = useStyles()

  function getDateString(date) {
    return format(parseISO(date), 'HH:mm')
  }

  const messages = rooms.byId[selectedRoom]?.messages
  const messageList = []

  console.log(messages)

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

      messageList.push({
        id: message.id,
        text: parse(message.content),
        type: 'text',
        position: message.sender !== userName ? 'left' : 'right',
        status:
          i !== 0 || message.sender !== userName
            ? ''
            : message.read
            ? 'read'
            : '',
        notch: false,
        dateString: getDateString(message.time),
      })
    })

  return <MessageList lockable={true} dataSource={messageList} />
}

export default ChatMessageList
