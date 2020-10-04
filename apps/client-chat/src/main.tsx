import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Provider } from 'react-redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { Switch } from 'react-router-dom'

import App, { themeWithOverrides } from './app/modules/app/'
import { socketMiddleware } from './app/store/middleware'
import { rootSaga, rootReducer } from './app/modules/chat/'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    socketMiddleware('http://localhost:4001'),
    sagaMiddleware,
    ...getDefaultMiddleware({ thunk: false }),
  ],
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={themeWithOverrides}>
        <CssBaseline />
        <Provider store={store}>
          <Switch>
            <App />
          </Switch>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
