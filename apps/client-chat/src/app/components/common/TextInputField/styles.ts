import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  label: {
    color: theme.palette.common.black,
    fontSize: theme.typography.h6.fontSize
  },
  focusedLabel: {
    '&&': {
      color: theme.palette.common.black
    }
  },
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    position: 'relative',
    backgroundColor: theme.palette.secondary.main,
    fontSize: 16,
    width: '100%',
    padding: `${theme.spacing(1) + 2}px ${theme.spacing(1) + 4}px`
  },
}));

export default useStyles;
