import { combineReducers } from "redux";
import { campgrounds } from "./campgrounds";
import { errors } from "./errors";

export const reducers = combineReducers({
  campgrounds,
  errors,
});
