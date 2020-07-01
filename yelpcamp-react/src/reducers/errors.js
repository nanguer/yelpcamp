import { SET_ERROR, CLEAR_ERRORS } from "../actions/types";

const initialState = {};

export const errors = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
};
