const AccessUser = 'AccessUser';

const setCurrentUser = (authReducer) => {
  localStorage.setItem(AccessUser, JSON.stringify(authReducer));
};

const clearCurrentUser = () => {
  localStorage.removeItem(AccessUser);
};

const getCurrentUser = () => {
  let user;
  try {
    user = JSON.parse(localStorage.getItem(AccessUser));
    return user;
  } catch (e) {
    return undefined;
  }
};

const authReducer = (state = null, action) => {

  switch (action.type) {
    case 'AUTH_USER_SUCCESS':
      setCurrentUser(action.payload);
      return { ...action.payload };

    case 'USER_LOGOUT':
      clearCurrentUser();
      return null;

    case 'CHECK_USER_LOGGED_IN':
      const user = getCurrentUser();
      if (user) return user;
      return null;

    default:
      return state;
  }
};

export { getCurrentUser, authReducer };
