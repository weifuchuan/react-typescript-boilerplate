import * as ReactDOM from "react-dom";
import * as React from "react";
import App from "./App";  
import "./index.less";
import {StoreContext,store} from './store'

ReactDOM.render(
  (
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  ) as any,
  document.getElementById('root')
);
