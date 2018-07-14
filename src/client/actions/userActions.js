import {
  AUTH_USER,
  AUTH_USER_SUCCESS,
  AUTH_USER_ERROR,
  CHECK_USER_LOGGED_IN,
  USER_LOGOUT,
  RESET_STATE,
} from './actionTypes';

import { postRequest } from '../utils/ajax';

const authenticateUser = (obj) => {
  return (dispatch) => {
    dispatch({ type: AUTH_USER });

    return postRequest('/auth', obj)
      .then((res) => {
        dispatch({
          type: AUTH_USER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({ type: USER_LOGOUT });

        dispatch({
          type: AUTH_USER_ERROR,
          payload: 'Enter Valid Username/Password',
        });

        throw new Error('Failed to login:', err);
      });
  };
};

const userLogout = (obj) => {
  return (dispatch) => {

    return postRequest('/logout', obj)
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: USER_LOGOUT });
          dispatch({ type: RESET_STATE });
        }
      })
      .catch(() => {
        dispatch({
          type: AUTH_USER_ERROR,
          payload: 'Could not logout',
        });
      })
  };
};

const checkUserLoggedIn = () => {
  return (dispatch) => {
    dispatch({ type: CHECK_USER_LOGGED_IN });
  };
};

export { authenticateUser, checkUserLoggedIn, userLogout };
