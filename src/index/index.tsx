import * as ReactDOM from "react-dom";
import * as React from "react";
import App from "./App";
import { Provider } from "mobx-react";
import store from "./store";
import "./index.scss";

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ) as any,
  document.getElementById('root')
);
