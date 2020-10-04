import React from 'react'
import ReactQuill, { Quill } from 'react-quill'
import quillEmoji from 'quill-emoji'

import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'
import AttachFileIcon from '@material-ui/icons/AttachFile'

import useStyles from './styles'
import 'react-quill/dist/quill.snow.css'
import 'quill-emoji/dist/quill-emoji.css'

const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji

Quill.register(
  {
    'formats/emoji': EmojiBlot,
    'modules/emoji-shortname': ShortNameEmoji,
    'modules/emoji-toolbar': ToolbarEmoji,
    'modules/emoji-textarea': TextAreaEmoji,
  },
  true,
)

const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      emoji: function () {},
    },
  },
  clipboard: {
    matchVisual: false,
  },
  'emoji-toolbar': true,
  'emoji-textarea': false,
  'emoji-shortname': true,
}

const formats = ['bold', 'italic', 'list', 'emoji']

const CustomToolbar = ({
  classes,
  onSendMessage,
  createMessageLoading,
  handleFileChange,
  disabled,
}) => (
  <div id='toolbar' className={classes.quill}>
    <input
      disabled={createMessageLoading || disabled}
      accept='image/png, image/jpeg'
      className={classes.displayNone}
      id='outlined-button-file'
      type='file'
      onChange={handleFileChange}
    />
    <label htmlFor='outlined-button-file'>
      <Button
        component='span'
        variant='text'
        disabled={createMessageLoading || disabled}
        className={classes.button}>
        <AttachFileIcon style={{ color: 'black' }} />
      </Button>
    </label>
    <button disabled={disabled} className='ql-bold' />
    <button disabled={disabled} className='ql-italic' />
    <button disabled={disabled} className='ql-list' value='ordered' />
    <button disabled={disabled} className='ql-list' value='bullet' />
    <button disabled={disabled} className='ql-emoji' />
    <button disabled={disabled} className={classes.rightIcon}>
      <SendIcon onClick={onSendMessage} fontSize='small' />
    </button>
  </div>
)

const ChatInput = ({
  disabled,
  loading,
  onFocus,
  onChange,
  onSend,
  onFileChange,
  inputEl,
  value,
}) => {
  const classes = useStyles()

  return (
    <>
      <ReactQuill
        theme='snow'
        modules={modules}
        formats={formats}
        className={classes.quill}
        readOnly={disabled}
        placeholder='apps.chat.input'
        onChange={onChange}
        onFocus={onFocus}
        onKeyUp={(e) => {
          if (e.shiftKey && e.keyCode === 13) {
            const els = document.getElementsByClassName('rce-mlist')
            const el = els.length > 0 && els[0]

            el && el.scrollTo(0, el.scrollHeight)

            return false
          }
          if (e.keyCode === 13 && !loading) {
            e.preventDefault()
            inputEl.current && inputEl.current.clear()
            onSend()
            return false
          }
        }}
        value={value}
      />
      <CustomToolbar
        classes={classes}
        disabled={disabled}
        createMessageLoading={loading}
        handleFileChange={onFileChange}
        onSendMessage={onSend}
      />
    </>
  )
}

export default ChatInput
