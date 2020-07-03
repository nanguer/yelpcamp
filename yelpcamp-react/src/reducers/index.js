import { combineReducers } from "redux";
import { campgrounds } from "./campgrounds";
import { errors } from "./errors";
import { auth } from "./auth";

export const reducers = combineReducers({
  campgrounds,
  errors,
  auth,
});
