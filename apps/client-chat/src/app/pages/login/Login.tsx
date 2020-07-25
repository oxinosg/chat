import React from 'react'
import { useHistory } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import { TextInputField, LoadingButton } from '../../components/common'
import { useStyles } from './styles'

type IProps = {
  userName: string
  setUserName: (name: string) => void
}

const Login = ({ userName, setUserName }: IProps) => {
  const history = useHistory()
  const classes = useStyles()

  function handleClick() {
    if (userName && userName !== '') {
      history.push('/chat')
    }
  }

  return (
    <Container style={{ background: '#fff' }} maxWidth='sm'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 100,
        }}>
        <Typography className={classes.title} variant='h2'>
          Login
        </Typography>
        <Typography className={classes.subTitle} variant='h4'>
          Just type the username you want 😆
        </Typography>
        <div className={classes.formContainer}>
          <TextInputField
            className={classes.formField}
            label='User name:'
            value={userName}
            onKeyPress={(e) => {
              if (e.charCode == 13) {
                e.preventDefault()
                handleClick()
              }
            }}
            onChange={(e) => setUserName(e.target.value)}
            type='text'
          />
        </div>
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            marginTop: 20,
          }}>
          <LoadingButton
            success
            text='Submit'
            clickHandler={handleClick}
            style={{
              width: 200,
            }}
          />
        </div>
      </div>
    </Container>
  )
}

export default Login
