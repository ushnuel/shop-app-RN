import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
};

export const authenticate = (action) => {
  return {
    token: action.token,
    userId: action.userId,
  };
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTO_SIGN_IN:
      return authenticate(action);
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default auth;
