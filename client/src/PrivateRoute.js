import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "./Context";

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
              pathname: "/sign-in",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
