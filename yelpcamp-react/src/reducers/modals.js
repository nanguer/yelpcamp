import {
  TOGGLE_LOGIN,
  TOGGLE_REGISTER,
  TOGGLE_NEW_CAMP,
} from "../actions/types";

const initialState = {
  showRegister: false,
  showLogin: false,
  showNewCamp: false,
};

export const modals = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOGIN:
      return { ...state, showLogin: !state.showLogin };
    case TOGGLE_REGISTER:
      return { ...state, showRegister: !state.showRegister };
    case TOGGLE_NEW_CAMP:
      return { ...state, showNewCamp: !state.showNewCamp };
    default:
      return state;
  }
};
