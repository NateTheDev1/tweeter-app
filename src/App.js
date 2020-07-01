import React from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { Switch, Route } from "react-router-dom";
import PublicRoute from "./helpers/PublicRoute";
import PrivateRoute from "./helpers/PrivateRoute";

function App() {
  return (
    <Switch>
      <PublicRoute restricted={true} exact path="/" component={SignUp} />
      <PublicRoute restricted={true} exact path="/login" component={Login} />
    </Switch>
  );
}

export default App;
