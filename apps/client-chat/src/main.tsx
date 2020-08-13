import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { Switch } from 'react-router-dom'

import { socketMiddleware } from './app/store/middleware'
import { rootReducer } from './app/store/reducers'

import App from './app/app'
import theme from './app/theme'

/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
// const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//   ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
//   : compose

const enhancer = compose(
  applyMiddleware(socketMiddleware('http://localhost:4001')),
  // (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  //   (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
)

const store = createStore(rootReducer, enhancer)
/* eslint-enable */
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
