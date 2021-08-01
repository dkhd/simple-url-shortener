import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./pages/home";
import History from "./pages/history";
import Redir from "./pages/redir";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/history" component={History} />
        <Route component={Redir} />
      </Switch>
    </Router>
  );
}