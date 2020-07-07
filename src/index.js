import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import indexReducer from "./reducers/indexReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

const store = createStore(
  indexReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastProvider autoDismiss autoDismissTimeout={5000}>
        <App />
      </ToastProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
