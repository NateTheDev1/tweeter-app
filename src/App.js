import React from "react";
import SignUp from "./pages/SignUp";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <SignUp />
      </Route>
    </Switch>
  );
}

export default App;
