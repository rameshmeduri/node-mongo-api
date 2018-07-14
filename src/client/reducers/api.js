import initialState from '../store/initialState';

const { currentApi, apis } = initialState;

const apiListReducer = (state = { apis }, action) => {
  switch (action.type) {

    case 'FETCH_APIS':
    return action.payload;

    default:
      return state;
  }
};

const currentApiReducer = (state = { currentApi }, action) => {
  switch (action.type) {

    case 'SET_CURRENT_API':
    return action.payload;

    default:
      return state;
  }
};


export { apiListReducer, currentApiReducer };
