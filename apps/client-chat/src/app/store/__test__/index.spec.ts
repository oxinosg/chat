import { call, take, spawn, put, takeEvery, all } from 'redux-saga/effects'

import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { socketMiddleware } from '../middleware'
import { rootReducer } from '../reducers'
import { createRoom } from '../actions'
import rootSaga from '../effects'

// https://redux-saga.js.org/docs/advanced/Testing.html
describe('Saga Integration Test Example', () => {
  it('test', () => {
    let actual = []

    function rootReducer(state, action) {
      return action
    }

    const effectMiddleware = (next) => (effect) => {
      console.log('=======')
      console.log('effect')
      console.log(effect)
      console.log('apiCall')
      console.log(apiCall)

      // hijack the ioEmit, etc action and set them to execute/return mock data
      if (effect === apiCall) {
        Promise.resolve().then(() => next('injected value'))
        return
      }

      return next(effect)
    }

    // const middleware = sagaMiddleware({
    //   effectMiddlewares: [effectMiddleware],
    // })
    // const store = createStore(rootReducer, {}, applyMiddleware(middleware))

    const middleware = createSagaMiddleware({
      effectMiddlewares: [effectMiddleware],
    })
    const store = createStore(rootReducer, {}, applyMiddleware(middleware))

    const apiCall = call(() => new Promise(() => {}))

    function* root() {
      actual.push(yield all([call(fnA), apiCall]))
    }

    function* fnA() {
      const result = []
      result.push((yield take('ACTION-1')).val)
      result.push((yield take('ACTION-2')).val)
      result.push((yield take('ACTION-527')).val)
      return result
    }

    const task = middleware.run(root)
    Promise.resolve()
      .then(() =>
        store.dispatch({
          type: 'ACTION-1',
          val: 1,
        }),
      )
      .then(() =>
        store.dispatch({
          type: 'ACTION-2',
          val: 2,
        }),
      )
      .then(() =>
        store.dispatch({
          type: 'ACTION-527',
          val: 'ha',
        }),
      )

    console.log('em')

    const expected = [[[1, 2], 'injected value']]
    return task.toPromise().then(() => {
      // effectMiddleware must be able to intercept and resolve effect in a custom way
      console.log(actual)
      expect(actual).toEqual(expected)
    })
  })
})
