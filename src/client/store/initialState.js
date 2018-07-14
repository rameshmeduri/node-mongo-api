import { MODE_VIEW } from './constants';

export default {
  currentUser: null,
  currentConsumer: {},
  currentApi: {},
  consumers: [],
  apis: [],
  mode: MODE_VIEW,
  errors: {
    loginForm: '',
    ajaxError: '',
  },
};
