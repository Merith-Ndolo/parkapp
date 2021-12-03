import React from "react";
import { hydrate, render } from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { getUsers } from "./actions/userAction";
import { getPlaces } from "./actions/parkingAction";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

store.dispatch(getUsers());
store.dispatch(getPlaces());

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
} else {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
}
