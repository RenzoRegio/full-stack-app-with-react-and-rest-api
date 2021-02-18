import { NavLink } from "react-router-dom";
import React, { useContext } from "react";
import { Context } from "../Context";

export default () => {
  const { authenticatedUser } = useContext(Context);
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <nav>
          {authenticatedUser ? (
            <React.Fragment>
              <span>
                Welcome {authenticatedUser.user.firstName}{" "}
                {authenticatedUser.user.lastName}!
              </span>
              <a className="signout" href="#">
                Sign Out
              </a>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {" "}
              <NavLink className="signup" to="/sign-up">
                Sign Up
              </NavLink>
              <NavLink className="signin" to="/sign-in">
                Sign In
              </NavLink>
            </React.Fragment>
          )}
        </nav>
      </div>
    </div>
  );
};
