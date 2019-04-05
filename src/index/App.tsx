import * as React from "react";
import { HashRouter, Route } from "react-keeper";
import "./App.less";

const Router = HashRouter;

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className={"container"}>
          <Route
            path={"/>"}
            loadComponent={cb =>
              import("@/index/pages/Home").then(C => cb(C.default))
            }
          />
        </div>
      </Router>
    );
  }
}

export default App;


