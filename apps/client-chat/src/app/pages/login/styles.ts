import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#343333',
    fontSize: 40,
  },
  subTitle: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
    color: '#7D7D7D',
  },
  field: {
    margin: 10,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    margin: 20,
    background: 'white',
    // width: 450,
    width: 'calc(100% - 40px)',
    alignItems: 'center',
  },
  formField: {
    width: 300,
  },
  rootAutocomplete: {
    '& .MuiInputBase-root': {},
  },
}))
