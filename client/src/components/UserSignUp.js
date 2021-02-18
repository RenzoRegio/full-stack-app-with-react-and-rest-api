import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context";
import { useHistory, Link } from "react-router-dom";

export default function UserSignUp() {
  const { data } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const change = (e) => {
    if (e.target.name === "firstName") {
      setFirstName(e.target.value);
    } else if (e.target.name === "lastName") {
      setLastName(e.target.value);
    } else if (e.target.name === "emailAddress") {
      setEmailAddress(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const user = { firstName, lastName, emailAddress, password };
    data.createUser(user).then((err) => {
      console.log(err);
    });
  };

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1> Sign Up</h1>
        <div>
          <form onSubmit={submit}>
            <div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className=""
                placeholder="First Name"
                value={firstName}
                onChange={change}
              />
            </div>
            <div>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className=""
                placeholder="Last Name"
                value={lastName}
                onChange={change}
              />
            </div>
            <div>
              <input
                id="emailAddress"
                name="emailAddress"
                type="text"
                className=""
                placeholder="Email Address"
                value={emailAddress}
                onChange={change}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                className=""
                placeholder="Password"
                value={password}
                onChange={change}
              />
            </div>
            {/* <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className=""
                placeholder="Confirm Password"
                value=""
              />
            </div> */}
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                Sign Up
              </button>
              <Link to="/courses">
                <button className="button button-secondary">Cancel</button>
              </Link>
            </div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>
          Already have a user account? <Link to="/sign-in">Click here</Link> to
          sign in!
        </p>
      </div>
    </div>
  );
}
