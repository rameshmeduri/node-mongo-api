import {
  FETCH_CONSUMERS,
  SET_CURRENT_CONSUMER,
  AJAX_ERROR,
  USER_LOGOUT,
  RESET_STATE,
} from './actionTypes';

import { getRequest, postRequest, putRequest, deleteRequest } from '../utils/ajax';

const fetchAllConsumers = () => {
  return (dispatch) => {

    return getRequest('/consumers')
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: FETCH_CONSUMERS,
            payload: res.data,
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch({ type: USER_LOGOUT });
          dispatch({ type: RESET_STATE });
        }

        dispatch ({
          type: AJAX_ERROR,
          payload: err,
        });
      });

  };
};

const setCurrentConsumer = (consumer) => {
  return (dispatch) => {

    dispatch({
      type: SET_CURRENT_CONSUMER,
      payload: consumer,
    });

  };
};

const createNewConsumer = (consumer) => {
  return (dispatch) => {

    return postRequest('/consumer', consumer)
      .then((res) => {
        if (res.status === 200 && res.data) {
          dispatch({
            type: SET_CURRENT_CONSUMER,
            payload: res.data,
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch({ type: USER_LOGOUT });
          dispatch({ type: RESET_STATE });
        }

        dispatch ({
          type: AJAX_ERROR,
          payload: err,
        });

        throw new Error('Failed to create user', err);
      });

  };
};

const updateExistingConsumer = (consumer) => {
  return (dispatch) => {

    return putRequest('/consumer', consumer)
      .then((res) => {
        if (res.status === 200 && res.data) {
          dispatch({
            type: SET_CURRENT_CONSUMER,
            payload: res.data,
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch({ type: USER_LOGOUT });
          dispatch({ type: RESET_STATE });
        }

        dispatch ({
          type: AJAX_ERROR,
          payload: err,
        });
      });

  };
};

const deleteExistingConsumer = (consumer) => {
  return (dispatch) => {

    return deleteRequest('/consumer/' + consumer.name)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: SET_CURRENT_CONSUMER,
            payload: {},
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch({ type: USER_LOGOUT });
          dispatch({ type: RESET_STATE });
        }

        dispatch ({
          type: AJAX_ERROR,
          payload: err,
        });
      });

  };
}

export { fetchAllConsumers, setCurrentConsumer, createNewConsumer, updateExistingConsumer, deleteExistingConsumer };
