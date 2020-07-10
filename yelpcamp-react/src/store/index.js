import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducers } from "../reducers";

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25,
  }) || compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
