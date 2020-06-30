import React from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <SignUp />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
