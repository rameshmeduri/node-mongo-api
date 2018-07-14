import initialState from '../store/initialState';

const { currentConsumer, consumers } = initialState;

const consumerListReducer = (state = { consumers }, action) => {
  switch (action.type) {

    case 'FETCH_CONSUMERS':
    return action.payload;

    default:
      return state;
  }
};

const currentConsumerReducer = (state = { currentConsumer }, action) => {
  switch (action.type) {

    case 'SET_CURRENT_CONSUMER':
    return action.payload;

    default:
      return state;
  }
};

export { consumerListReducer, currentConsumerReducer } ;
