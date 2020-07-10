import { TOGGLE_LOGIN, TOGGLE_NEW_CAMP } from "./types";

export const toggleLogin = () => {
  return {
    type: TOGGLE_LOGIN,
  };
};

export const toggleNewCamp = () => {
  return {
    type: TOGGLE_NEW_CAMP,
  };
};

// export default toggleLogin;
