import React, { Component } from "react";
import Data from "./Data";

export const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
  }
  render() {
    const value = {
      data: this.data,
      actions: {
        signIn: this.signIn,
      },
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      console.log("Authenticated");
    }
  };
}
export const Consumer = Context.Consumer;
export default { Context };
