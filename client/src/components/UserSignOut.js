import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../Context";

/**
 * Calls the signOut function from Context.js which sets the authenticatedUser and userPassword states to null 
 and also removes the authenticatedUser and userPassword cookies.
 */

export default () => {
  const { actions } = useContext(Context);
  useEffect(() => {
    actions.signOut();
  }, []);
  return <Redirect to="/" />;
};
