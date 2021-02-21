import React, { Component, useState } from "react";
import Data from "./Data";
import Cookies from "js-cookie";

export const Context = React.createContext();

export class Provider extends Component {
  state = {
    authenticatedUser: Cookies.getJSON("authenticatedUser") || null,
    userPassword: Cookies.getJSON("userPassword") || null,
    courseList: [],
  };

  constructor() {
    super();
    this.data = new Data();
  }

  componentDidMount() {
    this.getAllCourses();
  }
  render() {
    const { authenticatedUser, userPassword } = this.state;
    const value = {
      authenticatedUser,
      userPassword,
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

  getAllCourses = async () => {
    const list = await this.data.getCourses();
    list.courses.map((course) => {
      this.setState({
        courseList: [...this.state.courseList, course.id],
      });
    });
  };

  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      this.setState(() => {
        return { authenticatedUser: user, password };
      });
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
      Cookies.set("userPassword", password, { expires: 1 });
    }
    return user;
  };

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove("authenticatedUser");
    Cookies.remove("userPassword");
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
