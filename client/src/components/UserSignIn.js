import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../Context";

export default (props) => {
  const { actions } = useContext(Context);
  const history = useHistory();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const DisplayErrors = actions.DisplayErrors;

  /**
   * Sets the value for the emailAddress and password states.
   * @param {Object} e - Event object.
   */

  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "emailAddress") {
      setEmailAddress(value);
    } else {
      setPassword(value);
    }
  };

  /**
   * Signs the user in and redirects the user to either the / route or the route from props.location.state (retrived from Routes configured as PrivateRoutes)
   * @param {Object} e - Event object.
   */

  const submit = (e) => {
    e.preventDefault();
    const { from } = props.location.state || {
      from: { pathname: "/" },
    };

    actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (!user) {
          setErrors(["Sign-in was unsuccessful"]);
        } else {
          history.push(from);
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/error");
      });
  };

  return (
    <div className="bounds">
      <h1 className="signin-title">Sign In</h1>
      <div>
        <DisplayErrors errorsObject={errors} />
        <form onSubmit={submit}>
          <div>
            <input
              id="emailAddress"
              name="emailAddress"
              type="text"
              placeholder="Email Address"
              value={emailAddress}
              onChange={change}
              className="input-style"
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={change}
              className="input-style"
            />
          </div>
          <div className="grid-100 pad-bottom">
            <button className="button" type="submit">
              Sign In
            </button>
            <Link to="/">
              <button className="button button-secondary">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
      <p>&nbsp;</p>
      <p>
        Don't have a user account?{" "}
        <Link className="redirect-link" to="/sign-up">
          Click here
        </Link>{" "}
        to sign up!
      </p>
    </div>
  );
};
