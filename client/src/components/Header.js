import { NavLink } from "react-router-dom";

export default () => {
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <nav>
          <a className="signup" href="#">
            Sign Up
          </a>
          <NavLink className="signin" to="/sign-in">
            Sign In
          </NavLink>
        </nav>
      </div>
    </div>
  );
};
