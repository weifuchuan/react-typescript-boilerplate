import * as React from "react";
import "./App.scss";
import { Route } from "react-router";
import Home from "./pages/Home";

class App extends React.Component {
  render() {
    return (
      <div>
        <Route path={"/"} component={Home} />
      </div>
    );
  }
}

export default App;
