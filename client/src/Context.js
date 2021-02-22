import React, { Component, useState } from "react";
import Data from "./Data";
import Cookies from "js-cookie";

export const Context = React.createContext();

export class Provider extends Component {
  state = {
    authenticatedUser: Cookies.getJSON("authenticatedUser") || null,
    userPassword: Cookies.getJSON("userPassword") || null,
  };

  constructor() {
    super();
    this.data = new Data();
  }

  /**
   * Returns the user object retrieved from the database.
   * @param {String} emailAddress - Email String that is sent to the data.getUser function which is used to authenticate the user trying to sign in.
   * @param {String} password - Password String that is sent to the data.getUser function which is used to authenticate the user trying to sign in.
   */

  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      this.setState(() => {
        return { authenticatedUser: user, userPassword: password };
      });
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
      Cookies.set("userPassword", password, { expires: 1 });
    }
    return user;
  };

  /**
   * Executes the signOut function and reverts the authenticatedUser and userPassword states to null and removes the necessary cookies.
   */

  signOut = () => {
    this.setState({ authenticatedUser: null, userPassword: null });
    Cookies.remove("authenticatedUser");
    Cookies.remove("userPassword");
  };

  /**
   * Displays the errors from the errorsObject - called on the CreateCourse, UpdateCourse SignUp, and SignIn components.
   * @param {Object} errorsObject - An object containing the errors returned from the database.
   */
  DisplayErrors = ({ errorsObject }) => {
    if (errorsObject.length) {
      return (
        <div className="validation--errors--container">
          <h2 className="validation--errors--label">ERROR</h2>
          <div className="validation-errors">
            <ul>
              {errorsObject.map((err, i) => {
                return (
                  <li className="error" key={i}>
                    {err}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    const { authenticatedUser, userPassword } = this.state;
    const value = {
      authenticatedUser,
      userPassword,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        DisplayErrors: this.DisplayErrors,
      },
    };

    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
}

export default Context;
