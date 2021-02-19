import { Context } from "../Context";
import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

export default function UserSignOut() {
  const { actions } = useContext(Context);
  useEffect(() => {
    actions.signOut();
  }, []);
  return <Redirect to="/" />;
}
