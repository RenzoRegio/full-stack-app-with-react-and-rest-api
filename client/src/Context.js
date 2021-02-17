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
      actions: {},
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
}
export const Consumer = Context.Consumer;
export default { Context };
