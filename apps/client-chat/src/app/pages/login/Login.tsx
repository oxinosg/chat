import React from 'react'
import { useHistory } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

type IProps = {
  userName: string
  setUserName: (name: string) => void
}

const Login = ({ userName, setUserName }: IProps) => {
  const history = useHistory()

  function handleClick() {
    if (userName) {
      history.push('/chat')
    }
  }

  return (
    <Container maxWidth='sm'>
      <Typography component='p'>Login</Typography>
      <TextField
        label='Username'
        onChange={(e) => setUserName(e.target.value)}
      />
      <Button variant='contained' onClick={handleClick}>
        Submit
      </Button>
    </Container>
  )
}

export default Login
