import { SET_CURRENT_USER, SET_ERROR, LOGOUT_USER } from "./types";
import setAuthToken from "../setAuthToken";
import jwt_decode from "jwt-decode";
import api from "./api";

export const registerUser = (userData) => async (dispatch) => {
  try {
    const res = await api.user().signUp(userData);
    console.log(res.status);
  } catch (e) {
    dispatch({
      type: SET_ERROR,
      payload: e.response.data,
    });
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const res = await api.user().login(userData);
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
    });
  } catch (e) {
    dispatch({
      type: SET_ERROR,
      payload: e.response.data,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch({
    type: LOGOUT_USER,
  });
};