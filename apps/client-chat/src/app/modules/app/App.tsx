import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'

import Chat from '../chat'
import Login from '../login'

export interface RouteChatParams {
  receiverId?: string
  jobId?: string
}

export const App = () => {
  const [userName, setUserName] = useState(null)

  useEffect(() => {
    if (!userName) {
      const id = sessionStorage.getItem('user_name')
      id && setUserName(id)
    }
  }, [])

  function handleSetUserName(value: string) {
    sessionStorage.setItem('user_name', value)
    setUserName(value)
  }

  return (
    <>
      <Route exact path='/'>
        <Login userName={userName} setUserName={handleSetUserName} />
      </Route>
      <Route path='/chat/:receiverId?/:jobId?'>
        {!userName ? <div>loading...</div> : <Chat userName={userName} />}
      </Route>
    </>
  )
}

export default App
