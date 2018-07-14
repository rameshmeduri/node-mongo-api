import {
  FETCH_APIS,
  SET_CURRENT_API,
  AJAX_ERROR,
  RESET_STATE,
  USER_LOGOUT,
} from './actionTypes';

import { getRequest, postRequest, putRequest, deleteRequest } from '../utils/ajax';


const fetchAllApis = () => {
  return (dispatch) => {

    return getRequest('/apis')
      .then((res) => {
        if (res.status === 200 && res.data) {
          dispatch({
            type: FETCH_APIS,
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

const setCurrentApi = (api) => {

  return (dispatch) => {

    dispatch({
      type: SET_CURRENT_API,
      payload: api,
    });

  };
};

const createNewApi = (api) => {  
  return (dispatch) => {

    return postRequest('/api', api)
      .then((res) => {
        if (res.status === 200 && res.data) {
          dispatch({
            type: SET_CURRENT_API,
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
        
        throw new Error('Failed to create a new api:', err);
      });

  };
};

const updateExistingApi = (api) => {
  return (dispatch) => {

    return putRequest('/api', api)
      .then((res) => {
        if (res.status === 200 && res.data) {
          dispatch({
            type: SET_CURRENT_API,
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

const deleteExistingApi = (api) => {
  return (dispatch) => {

    return deleteRequest('/api/' + api.name)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: SET_CURRENT_API,
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

export { fetchAllApis, setCurrentApi, createNewApi, updateExistingApi, deleteExistingApi };
