import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context";
import { useHistory, Link } from "react-router-dom";

export default function UserSignUp() {
  const { data, actions } = useContext(Context);
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const DisplayErrors = actions.DisplayErrors;

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
    let errorsList;
    data
      .createUser(user)
      .then((err) => {
        if (err.length) {
          setErrors(err);
          errorsList = document.querySelectorAll("li");
          const form = document.querySelector("form");
          checkErrors(errorsList);
          form.addEventListener("change", () => {
            validateErrors(errorsList);
          });
        } else {
          actions.signIn(emailAddress, password);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkErrors = (errorsList) => {
    const firstNameBox = document.querySelector("#firstName");
    const lastNameBox = document.querySelector("#lastName");
    const emailBox = document.querySelector("#emailAddress");
    const passwordBox = document.querySelector("#password");

    for (let i = 0; i < errorsList.length; i++) {
      const error = errorsList[i].textContent.toLowerCase();
      if (error.includes("first")) {
        firstNameBox.style.border = "2px solid red";
      }
      if (error.includes("last")) {
        lastNameBox.style.border = "2px solid red";
      }
      if (error.includes("email")) {
        emailBox.style.border = "2px solid red";
      }
      if (error.includes("password")) {
        passwordBox.style.border = "2px solid red";
      }
    }
  };

  const validateErrors = (errorsList) => {
    const firstNameBox = document.querySelector("#firstName");
    const lastNameBox = document.querySelector("#lastName");
    const emailBox = document.querySelector("#emailAddress");
    const passwordBox = document.querySelector("#password");

    for (let i = 0; i < errorsList.length; i++) {
      const error = errorsList[i].textContent.toLowerCase();
      if (!error.includes("first")) {
        firstNameBox.style.border = "2px solid green";
      }
      if (!error.includes("last")) {
        lastNameBox.style.border = "2px solid green";
      }
      if (!error.includes("email")) {
        emailBox.style.border = "2px solid green";
      }
      if (!error.includes("password")) {
        passwordBox.style.border = "2px solid green";
      }
    }
  };

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1 className="form-title"> Sign Up</h1>
        <div>
          <DisplayErrors errorsObject={errors} />
          <form onSubmit={submit}>
            <div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="input-style"
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
                className="input-style"
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
                className="input-style"
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
                className="input-style"
                placeholder="Password"
                value={password}
                onChange={change}
              />
            </div>
            <div className="grid-100 pad-bottom button-container">
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
          Already have a user account?{" "}
          <Link className="redirect-link" to="/sign-in">
            Click here
          </Link>{" "}
          to sign in!
        </p>
      </div>
    </div>
  );
}
