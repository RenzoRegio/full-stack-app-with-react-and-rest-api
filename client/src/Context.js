import React, { Component, useState } from "react";
import Data from "./Data";

export const Context = React.createContext();

export class Provider extends Component {
  state = {
    authenticatedUser: null,
    password1: null,
    course: null,
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser, password1, course } = this.state;
    const value = {
      authenticatedUser,
      password1,
      course,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        getCourse: this.getCourse,
        DisplayErrors: this.DisplayErrors,
      },
    };

    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      this.setState(() => {
        return { authenticatedUser: user, password1: password };
      });
      console.log("Authenticated");
    }
    return user;
  };

  signOut = () => {
    this.setState({ authenticatedUser: null });
  };

  getCourse = (courseObj) => {
    this.setState({
      course: courseObj,
    });
  };

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
}

export const Consumer = Context.Consumer;
export default Context;
