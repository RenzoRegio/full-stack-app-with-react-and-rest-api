import React, { Component, useState } from "react";
import Data from "./Data";

export const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
  }

  state = {
    authenticatedUser: null,
    password1: null,
    course: null,
  };

  render() {
    const { authenticatedUser, password1, course } = this.state;
    const value = {
      authenticatedUser,
      password1,
      course,
      data: this.data,
      actions: {
        signIn: this.signIn,
        getCourse: this.getCourse,
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

  getCourse = (courseObj) => {
    this.setState({
      course: courseObj,
    });
  };
}
export const Consumer = Context.Consumer;
export default { Context };
