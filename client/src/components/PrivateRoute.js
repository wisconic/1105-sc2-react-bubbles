import React from "react";
import { Route, Redirect } from "react-router-dom";

// Requirement 1 -- It has the same API as `<Route />`
// Requirement 2 -- It renders a `<Route />` and passes all the props through to it.
// Requirement 3 -- It checks if the user is authenticated
// --> if they are: render the "component" prop.
// --> If not: redirect user to "/login".

// rest operator (looks a lot like spread operator)
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect to='/' />
      )
    }
  />
);
export default PrivateRoute;
