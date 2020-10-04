import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    width: '100%',
    maxWidth: 1600,
    height: '100%',
  },
  grid: {
    width: '100%',
    height: '100%',
    margin: '0 auto',
    [breakpoints.down('xs')]: {
      padding: '0',
    },
  },
  gridItem: {
    [breakpoints.down('xs')]: {
      padding: '0!important',
    },
  },
  content: {
    paddingTop: spacing(4),
    paddingBottom: spacing(4),
  },
  title: {
    marginBottom: spacing(3),
  },
  titleBlack: {
    color: '#282835',
  },
  titleGrey: {
    color: '#9E9E9E',
  },
  itemLeft: {
    '&$item': {
      borderRadius: '24px 0px 0px 24px',
      borderRight: 0,
    },
  },
  itemRight: {
    '&$item': {
      borderRadius: '0px 24px 24px 0px',
    },
  },
  item: {
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    borderRadius: 0,
    border: '1px solid #0000000A',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    [breakpoints.up('sm')]: {
      height: 'calc(100vh - 64px)',
    },
    [breakpoints.down('xs')]: {
      height: 'calc(100vh - 56px)',
    },
    position: 'relative',
    '& .rce-mlist': {
      paddingBottom: 16,
      paddingTop: 16,
    },
    '& .rce-container-mlist': {
      position: 'relative',
      height: '100%',
      overflow: 'auto',
    },
    '& .rce-smsg': {
      borderRadius: 'none',
      boxShadow: 'none',
      padding: 0,
    },
    '& .rce-container-clist': {
      overflowY: 'auto',
      overflowX: 'hidden',
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
    },
    '& .rce-mbox-time-block': {
      background: 'inherit',
    },
    '& .rce-mbox-photo--img': {
      minWidth: '152px',
      minHeight: '152px',
      maxWidth: '152px',
      maxHeight: '152px',
      '& img': {
        minWidth: '152px',
        minHeight: '152px',
        maxWidth: '152px',
        maxHeight: '152px',
        objectFit: 'cover',
      },
      '& img[alt]:after': {
        display: 'block',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'url("https://via.placeholder.com/150")',
        fontWeight: 300,
        lineHeight: 2,
        textAlign: 'center',
        content: 'attr(alt)',
      },
    },
    '& .rce-citem-avatar': {
      paddingLeft: 24,
    },
    '& .rce-mbox-time': {
      right: '-2px',
    },
    '& .rce-mbox': {
      boxShadow: 'none',
      borderRadius: '14px!important',
      backgroundColor: '#f1f5f8',
      border: '1px solid #0000000A',
    },
    '& .rce-mbox.rce-mbox--clear-notch': {
      borderRadius: '18px 18px 18px 0px!important',
    },
    '& .rce-mbox.rce-mbox-right.rce-mbox--clear-notch': {
      borderRadius: '18px 18px 0px 18px!important',
    },
    '& .rce-mbox-left': {
      background: '#F5F6FA 0% 0% no-repeat padding-box',
    },
    '& .rce-mbox-right': {
      background: '#0FB2D9 0% 0% no-repeat padding-box',
      color: '#fff',
    },
    '& .not-read .rce-mbox-right .rce-mbox-status svg': {
      display: 'none',
    },
    '& .rce-mbox-right .rce-mbox-status svg': {
      fill: '#fff',
    },
    '& .rce-mbox-right .rce-mbox-time': {
      color: '#fff',
    },
    '& .rce-citem': {
      borderBottom: '1px solid #0000000A',
      height: 96,
      position: 'relative',
    },
    '& .rce-citem:hover': {
      background: '#e9e9e9',
    },
    '& .rce-citem-body': {
      borderBottom: 'none',
    },
    '& .rce-citem-body--bottom-title': {
      color: '#B7B7B7',
    },
    '& .rce-avatar-container.flexible .rce-avatar': {
      height: '100%!important',
    },
    '& .rce-mbox-text p': {
      marginTop: 2,
      marginBottom: 2,
    },
    '& .rce-mbox-text ul': {
      paddingLeft: 20,
      marginTop: 2,
      marginBottom: 4,
    },
  },
  unreadItem: {
    '& .rce-citem': {
      background: '#F9F9F9 0% 0% no-repeat padding-box',
    },
    '& .rce-citem-avatar:before': {
      content: '""',
      width: 10,
      height: 10,
      'border-radius': '50%',
      background: '#3B86FF',
      display: 'inline-block',
      'margin-right': 4,
      left: 8,
      position: 'absolute',
    },
  },
  selectedItem: {
    '& .rce-citem': {
      background: 'rgba(15, 178, 217, 0.10)',
    },
  },
  onlineItem: {
    '& .rce-avatar-container:before': {
      right: 8,
      bottom: '25%',
      width: 14,
      height: 14,
      content: '""',
      display: 'inline-block',
      position: 'absolute',
      background: '#66D80F',
      marginRight: 4,
      borderRadius: '50%',
    },
  },
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
  hiddenXs: {
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  backToList: {
    padding: 0,
    borderBottom: '1px solid #0000000A',
    '& span': {
      fontSize: 16,
    },
    [breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  backButtonWrapper: {
    padding: 6,
  },
  displayNone: {
    display: 'none!important',
  },
  image: {
    width: '100%',
    height: '100%',
    minWidth: 150,
    minHeight: 150,
    '& img[alt]:after': {
      display: 'block',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background: 'url("https://via.placeholder.com/150")',
      fontWeight: 300,
      lineHeight: 2,
      textAlign: 'center',
      content: 'attr(alt)',
    },
  },
  dialogButton: {
    width: '100%',
    margin: '0',
    marginBottom: '0',
    marginTop: '-4px',
    borderRadius: '0',
    background: '#0FB2D9 0% 0% no-repeat padding-box',
  },
  productContainer: {
    width: 'calc(100% - 48px)',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #0000000A',
    boxShadow: 'none',
    borderRadius: 4,
    minHeight: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 32,
    marginTop: '30%',
    flexDirection: 'column',
  },
  cardTitle: {
    fontStyle: 'normal',
    lineHeight: 'normal',
    fontSize: '18px',
    color: '#2E3133',
    padding: 16,
  },
}))

export default useStyles
