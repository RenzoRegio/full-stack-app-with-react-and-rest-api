import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Context } from "../Context";

export default () => {
  const { data, actions } = useContext(Context);
  const history = useHistory();
  const DisplayErrors = actions.DisplayErrors;

  //Information for the User
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  /**
   * Sets the value for the different states of the user object - firstName, lastName, emailAddress and password.
   * @param {Object} e - Event object.
   */

  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "emailAddress") {
      setEmailAddress(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  /**
   * Creates and signs a user in. If there are any errors, it validates and displays the errors before creating the user and redirecting to the / route.
   * @param {Object} e - Event object.
   */

  const submit = (e) => {
    e.preventDefault();
    const user = { firstName, lastName, emailAddress, password };
    data
      .createUser(user)
      .then((err) => {
        if (err.length) {
          setErrors(err);
          const errorsList = document.querySelectorAll("li");
          const form = document.querySelector("form");
          validateErrors(errorsList, "red");
          form.addEventListener("change", (e) => {
            e.preventDefault();
            validateErrors(errorsList, "green");
          });
        } else {
          actions.signIn(emailAddress, password);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/error");
      });
  };

  /**
   * Adds a border style to the input specified if the error associated is included in the errorList array.
   * @param {Array} errorsList - An array containing the errors retrieved from the database validation.
   * @param {String} color - Determines the color to style the border of the input.
   */

  const validateErrors = (errorsList, color) => {
    const firstNameBox = document.querySelector("#firstName");
    const lastNameBox = document.querySelector("#lastName");
    const emailBox = document.querySelector("#emailAddress");
    const passwordBox = document.querySelector("#password");
    for (let i = 0; i < errorsList.length; i++) {
      const error = errorsList[i].textContent.toLowerCase();
      if (error.includes("first")) {
        firstNameBox.style.border = `2px solid ${color}`;
      }
      if (error.includes("last")) {
        lastNameBox.style.border = `2px solid ${color}`;
      }
      if (error.includes("email")) {
        emailBox.style.border = `2px solid ${color}`;
      }
      if (error.includes("characters")) {
        passwordBox.style.border = `2px solid ${color}`;
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
              <Link to="/">
                <button className="button button-secondary">Cancel</button>
              </Link>
            </div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>
          Already have a user account?{" "}
          <Link className="redirect-link" to="/signin">
            Click here
          </Link>{" "}
          to sign in!
        </p>
      </div>
    </div>
  );
};
