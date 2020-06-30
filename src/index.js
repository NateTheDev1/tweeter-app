import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import indexReducer from "./reducers/indexReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const store = createStore(
  indexReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(<App />, document.getElementById("root"));
