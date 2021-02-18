import { Link, useHistory } from "react-router-dom";
import React, { useState, useContext } from "react";
import { Context } from "../Context";

export default function UserSignIn() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { actions } = useContext(Context);
  const history = useHistory();

  const change = (e) => {
    if (e.target.name === "emailAddress") {
      setEmailAddress(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (!user) {
          setErrors([{ errors: "Sign-in was unsuccessful" }]);
        } else {
          history.push("/courses");
          console.log(`SUCCESS! ${emailAddress} successfully logged in`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bounds">
      <h1>Sign In</h1>
      <div>
        <form onSubmit={submit}>
          <div>
            <input
              id="emailAddress"
              name="emailAddress"
              type="text"
              placeholder="Email Address"
              value={emailAddress}
              onChange={change}
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
        Don't have a user account? <Link to="/sign-up">Click here</Link>
      </p>
    </div>
  );
}
