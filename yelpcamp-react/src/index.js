import React from "react";
import ReactDOM from "react-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import { ToastProvider } from "react-toast-notifications";
import setAuthToken from "./setAuthToken";
import jwt_decode from "jwt-decode";
import * as serviceWorker from "./serviceWorker";

import "./styles/styles.scss";
import { SET_CURRENT_USER, LOGOUT_USER } from "./actions/types";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch({ type: SET_CURRENT_USER, payload: decoded });

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch({
      type: LOGOUT_USER,
    });
    window.Location.href = "/";
  }
}

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider>
      <AppRouter />
    </ToastProvider>
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
