import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Switch } from 'react-router-dom'

import { socketMiddleware } from './app/store/middleware'
import { rootReducer } from './app/store/reducers'

import App from './app/app'
import theme from './app/theme'
import rootSaga from './app/store/saga'

/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
// const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//   ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
//   : compose

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
  applyMiddleware(socketMiddleware('http://localhost:4001'), sagaMiddleware),
)

const store = createStore(rootReducer, enhancer)
/* eslint-enable */

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Switch>
          <App />
        </Switch>
      </Provider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)
