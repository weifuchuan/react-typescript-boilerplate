import * as ReactDOM from "react-dom";
import * as React from "react";
import App from "./App";
import store from "./redux/store";
import "./index.scss";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  (
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  ) as any,
  document.getElementById("root")
);
