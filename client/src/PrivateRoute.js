import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "./Context";

//Higher Order Component which redirects routes to the sign-in page if the current user is not authenticated / logged in yet.
export default ({ component: Component, ...rest }) => {
  const { authenticatedUser } = useContext(Context);
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticatedUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
