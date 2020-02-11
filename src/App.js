import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import Subscriptions from "./components/Subscriptions";
import Register from "./components/Register";

const App = () => {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/subscriptions">Subscriptions</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/subscriptions">
          <Subscriptions />
        </Route>
        <Route path="/">Home</Route>
      </Switch>
    </Router>
  );
};

export default App;
