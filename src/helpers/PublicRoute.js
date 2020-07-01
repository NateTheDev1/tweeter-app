import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token").length !== 0 && restricted ? (
          <Redirect to="/home" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
