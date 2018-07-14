import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import rootReducer from '../reducers';
import initialState from './initialState';

export const history = createHistory();

const enhancers = [];
let middlewares;

if (process.env.NODE_ENV === 'development') {
  middlewares = [
    routerMiddleware(history),
    reduxImmutableStateInvariant(),
    thunk,
    logger,
  ];
  const devToolsExtension = window.devToolsExtension
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
} else {
  middlewares = [routerMiddleware(history), thunk];
}

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store;