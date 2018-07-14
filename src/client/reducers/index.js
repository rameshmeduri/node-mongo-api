import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { authReducer } from './auth';
import { modeReducer } from './misc';
import { consumerListReducer, currentConsumerReducer }  from './consumer';
import { apiListReducer, currentApiReducer }  from './api';
import initialState from '../store/initialState';
import errorReducer from './error';


const appReducers = combineReducers({
  router: routerReducer,
  currentUser: authReducer,
  currentConsumer: currentConsumerReducer,
  consumers: consumerListReducer,
  currentApi: currentApiReducer,
  apis: apiListReducer,
  mode: modeReducer,
  errors: errorReducer,
});

export default function rootReducer(state, action) {
  if (action.type) {
    const prvState = Object.assign({}, state);
    state = Object.assign(prvState, { errors: initialState.errors });
  }

  if (action.type === 'RESET_STATE') {
    state = initialState;
  }

  return appReducers(state, action);
}
