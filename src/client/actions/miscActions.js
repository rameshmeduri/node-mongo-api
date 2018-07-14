import {
  SET_MODE,
  CLEAR_ERRORS,
} from './actionTypes';

const clearErrors = () => {
  return (dispatch) => {
    dispatch ({
      type: CLEAR_ERRORS,
    });
  };
};

const setViewMode = (mode) => {
  return (dispatch) => {
    dispatch ({
      type: SET_MODE,
      payload: mode,
    });
  };
};

export { clearErrors, setViewMode };
