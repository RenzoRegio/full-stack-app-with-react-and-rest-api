import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import { Context } from "../Context";

export default function UserSignIn() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const { actions } = useContext(Context);
  const change = (e) => {
    if (e.target.name === "emailAddress") {
      setEmailAddress(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    actions.signIn(emailAddress, password).then((user) => {
      if (user !== null) {
        console.log(`SUCCESS! ${emailAddress} is logged in`);
      }
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
            <button className="button button-secondary">Cancel</button>
          </div>
        </form>
      </div>
      <p>&nbsp;</p>
      <p>
        Don't have a user account? <Link>Click here</Link>{" "}
      </p>
    </div>
  );
}
