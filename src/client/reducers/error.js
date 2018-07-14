import initialState from '../store/initialState';

const errorReducer = (state = initialState.errors, action) => {
  switch (action.type) {

    case 'CLEAR_ERRORS':
    return { loginForm: '', ajaxError: '' };

    case 'AUTH_USER_ERROR':
    return Object.assign({}, state, {
      loginForm: action.payload,
    });

    case 'AUTH_USER_SUCCESS':
    return Object.assign({}, state, {
      loginForm: '',
    });

    case 'AJAX_ERROR':
    return Object.assign({}, state, {
      ajaxError: action.payload,
    });

    default:
      return state;
  }
};

export default errorReducer;
