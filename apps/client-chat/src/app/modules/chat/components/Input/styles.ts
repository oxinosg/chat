import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  input: {
    bottom: 0,
    width: '100%',
    padding: 20,
    borderTop: '1px solid #0000000A',
    '& svg': {
      fill: '#B7B7B7',
    },
    '& .ql-snow .ql-stroke': {
      stroke: '#B7B7B7',
    },
    '& .ql-container.ql-snow': {
      background: '#F5F6FA',
      border: '1px solid #0000000A',
      borderBottom: 'none',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    '& .ql-toolbar.ql-snow': {
      background: '#F5F6FA',
      border: '1px solid #0000000A',
      borderTop: 'none',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
  },
  button: {
    float: 'left',
    height: '100%',
    padding: 0,
    minWidth: 18,
    height: 22,
    width: 28,
    minHeight: 18,
    '&:hover': {
      backgroundColor: '#F5F6FA',
      cursor: 'pointer',
      '& svg': {
        fill: '#06c',
      },
    },
    '& svg': {
      height: 18,
      width: 18,
    },
  },
  displayNone: {
    display: 'none!important',
  },
  quill: {
    position: 'relative',
    background: 'white',
    '& #emoji-palette': {
      top: '-215px!important',
    },
    '& .ql-toolbar.ql-snow': {
      background: 'white',
    },
    '& .ql-toolbar': {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      transform: 'translateY(100%)',
    },
    '& .ql-editor.ql-blank::before': {
      color: '#0FB2D9',
    },
    '& .ql-disabled .ql-editor.ql-blank::before': {
      color: '#B7B7B7',
    },
  },
  rightIcon: {
    float: 'right!important',
    '& svg': {
      fill: '#0FB2D9!important',
    },
  },
}))

export default useStyles
