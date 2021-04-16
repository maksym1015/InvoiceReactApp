import React from "react";
import { Route, Redirect } from "react-router-dom";

const UnguardedRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !auth ? <Component {...props} /> : <Redirect to="/dashboard" />
    }
  />
);

export default UnguardedRoute;
