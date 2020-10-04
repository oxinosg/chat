import { makeStyles, Theme } from '@material-ui/core/styles'
import { green, red } from '@material-ui/core/colors'

export const useStyles = makeStyles((theme: Theme) => ({
  buttonSuccess: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  buttonFailed: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))
