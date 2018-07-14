import initialState from '../store/initialState';

const { mode } = initialState;

const modeReducer = (state = { mode }, action) => {
  switch (action.type) {

    case 'SET_MODE':
    return action.payload;

    default:
      return state;
  }
};

export { modeReducer }
