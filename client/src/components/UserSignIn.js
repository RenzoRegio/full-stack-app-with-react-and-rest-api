import { Link, useHistory } from "react-router-dom";
import React, { useState, useContext } from "react";
import { Context } from "../Context";

export default (props) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { actions } = useContext(Context);
  const history = useHistory();
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
   *
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
              type="text"
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
            <Link to="/courses">
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
