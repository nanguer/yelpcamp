import { SET_CURRENT_USER, LOGOUT_USER } from "../actions/types";
import isEmpty from "../isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    default:
      return state;
  }
};
