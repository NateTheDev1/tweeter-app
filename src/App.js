import React from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { Switch, Route } from "react-router-dom";
import PublicRoute from "./helpers/PublicRoute";
import PrivateRoute from "./helpers/PrivateRoute";
import Home from "./pages/Home";

function App() {
  return (
    <Switch>
      <PublicRoute restricted={true} exact path="/" component={SignUp} />
      <PublicRoute restricted={true} exact path="/login" component={Login} />
      <Route exact path="/home">
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
