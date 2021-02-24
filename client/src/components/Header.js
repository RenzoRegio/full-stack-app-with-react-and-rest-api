import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
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
                {`Welcome, ${authenticatedUser.user.firstName} ${authenticatedUser.user.lastName}`}
              </span>
              <NavLink className="signout" to="/signout">
                Sign Out
              </NavLink>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {" "}
              <NavLink className="signup" to="/signup">
                Sign Up
              </NavLink>
              <NavLink className="signin" to="/signin">
                Sign In
              </NavLink>
            </React.Fragment>
          )}
        </nav>
      </div>
    </div>
  );
};
