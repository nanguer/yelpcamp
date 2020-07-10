/* eslint-disable no-undef */
import { ACTION_TYPES } from "../actions/campgrounds";
const initialState = {
  list: [],
  viewing: {},
};
export const campgrounds = (state = initialState, action) => {
  const { FETCH_ALL, FETCH_ONE, CREATE } = ACTION_TYPES;

  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        list: [...action.payload],
      };
    case FETCH_ONE:
      return {
        ...state,
        viewing: { ...action.payload },
      };
    case CREATE:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    // case UPDATE:
    //   return {
    //     ...state,
    //     list: state.list.map((donor) =>
    //       donor.id === action.payload.id ? action.payload : donor
    //     ),
    //   };
    // case DELETE:
    //   return {
    //     ...state,
    //     list: state.list.filter(({ id }) => id !== action.payload),
    //   };

    default:
      return state;
  }
};
