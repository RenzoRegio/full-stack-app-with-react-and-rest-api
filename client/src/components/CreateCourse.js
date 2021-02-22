import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../Context";

export default function CreateCourse() {
  const history = useHistory();
  const { data, authenticatedUser, actions, userPassword } = useContext(
    Context
  );

  //Information for the Course
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);
  const DisplayErrors = actions.DisplayErrors;

  //Information for the User
  const [userId, setUserId] = useState(`${authenticatedUser.user.id}`);
  const [userEmail, setUserEmail] = useState(
    authenticatedUser.user.emailAddress
  );

  //DOM to display error styles
  const form = document.querySelector("form");
  const titleBox = document.querySelector("#title");
  const descriptionBox = document.querySelector("#description");

  /**
   * Sets the value for the different states of the Course object - title, description, estimatedTime and materialsNeeded.
   * @param {Object} e - Event object.
   */

  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "estimatedTime") {
      setEstimatedTime(value);
    } else if (name === "materialsNeeded") {
      setMaterialsNeeded(value);
    }
  };

  /**
   * Creates a course and if there are any errors, it validates and displays the errors before creating the course and returning home.
   * @param {Object} e - Event object.
   */

  const submit = (e) => {
    e.preventDefault();
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };

    data
      .createCourse(course, userEmail, userPassword)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
          const errorsList = document.querySelectorAll(".error");
          validateErrors(errorsList, "red");
          form.addEventListener("submit", () => {
            validateErrors(errorsList, "green");
          });
        } else {
          history.push("/");
        }
      })
      .catch((err) => {
        console.error(err);
        history.push("/error");
      });

    /**
     * Adds a border style to the input specified if the error associated is included in the errorList list.
     * @param {List} errorsList - A list containing the errors retrieved from the database validation.
     * @param {String} color - Determines the color to style the border of the input.
     */

    const validateErrors = (errorsList, color) => {
      for (let i = 0; i < errorsList.length; i++) {
        const error = errorsList[i].textContent.toLowerCase();
        if (error.includes("title")) {
          titleBox.style.border = `2px solid ${color}`;
        }
        if (error.includes("description")) {
          descriptionBox.style.border = `2px solid ${color}`;
        }
      }
    };
  };

  return (
    <div className="bounds course--detail">
      <h1> Create Course </h1>
      <DisplayErrors errorsObject={errors} />
      <form onSubmit={submit}>
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <div>
              <input
                id="title"
                name="title"
                type="text"
                className="input-title course--title--input"
                placeholder="Course title..."
                value={title}
                onChange={change}
              />
            </div>
            <p>
              By{" "}
              {`${authenticatedUser.user.firstName} ${authenticatedUser.user.lastName}`}
            </p>
          </div>
          <div className="course--description">
            <div>
              <textarea
                id="description"
                name="description"
                className=""
                placeholder="Course description..."
                value={description}
                onChange={change}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item">
                <h4> Estimated Time </h4>
                <div>
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    className="course--time--input"
                    placeholder="Hours"
                    value={estimatedTime}
                    onChange={change}
                  />
                </div>
              </li>
              <li className="course--stats--list--item">
                <h4>Materials Needed</h4>
                <div>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    placeholder="List materials..."
                    value={materialsNeeded}
                    onChange={change}
                  ></textarea>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid-100 pad-bottom">
          <button className="button" type="submit">
            Create Course
          </button>
          <Link className="button button-secondary" to="/">
            {" "}
            Cancel{" "}
          </Link>
        </div>
      </form>
    </div>
  );
}
