import { Context } from "../Context";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();
  const { data, actions, authenticatedUser, userPassword } = useContext(
    Context
  );

  //DOM to display error styles
  const form = document.querySelector("form");
  const titleBox = document.querySelector("#title");
  const descriptionBox = document.querySelector("#description");

  //Information for the Course
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [currentCourse, setCurrentCourse] = useState({});
  const [errors, setErrors] = useState([]);
  const DisplayErrors = actions.DisplayErrors;

  //Sets the emailAddress if authenticatedUser is true
  let emailAddress;
  if (authenticatedUser) {
    emailAddress = authenticatedUser.user.emailAddress;
  }

  useEffect(() => {
    //Retrieves the path from the URI
    let path = window.location.pathname;
    path = path.replace("/update", "");

    //Retrieves the course using the path variable
    data
      .getCourse(path)
      .then((response) => {
        const course = response.course;
        if (
          !authenticatedUser ||
          course.user.id !== authenticatedUser.user.id
        ) {
          //If the user is not authenticated or the user's ID is not equal to the course's user's ID.
          history.push("/forbidden");
        } else {
          //If the user is authenticated and the user's ID is equal to the course's user's ID then the following states will be set.
          setTitle(course.title);
          setDescription(course.description);
          setEstimatedTime(course.estimatedTime);
          setMaterialsNeeded(course.materialsNeeded);
          setCurrentCourse(course);
        }
      })
      .catch((error) => {
        history.push("/notfound");
      });
  }, []);

  const updateCourseData = {
    title,
    description,
    estimatedTime,
    materialsNeeded,
  };

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
   * Updates the current course and if there are any errors, it validates and displays the errors before updating the course and returning home.
   * @param {Object} e - Event object.
   */

  const submit = (e) => {
    e.preventDefault();

    data
      .updateCourse(
        currentCourse.id,
        updateCourseData,
        emailAddress,
        userPassword
      )
      .then((err) => {
        if (err.length) {
          setErrors(err);
          const errorList = document.querySelectorAll(".error");
          validateErrors(errorList, "red");
          form.addEventListener("submit", (e) => {
            e.preventDefault();
            validateErrors(errorList, "green");
          });
        } else {
          history.push(`/`);
        }
      })
      .catch((err) => {
        console.error(err);
        history.push("/error");
      });

    /**
     * Adds a border style to the input specified if the error associated is included in the errorList array.
     * @param {Array} errorsList - An array containing the errors retrieved from the database validation.
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
      <h1>Update Course</h1>
      <div>
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
              <p>{`${authenticatedUser.user.firstName} ${authenticatedUser.user.lastName}`}</p>
            </div>
            <div className="course--description">
              <div>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Course description..."
                  onChange={change}
                  value={description}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
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
                  <h4> Materials Needed </h4>
                  <div>
                    <textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      placeholder="List materials..."
                      onChange={change}
                      value={materialsNeeded}
                    ></textarea>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-100 pad-bottom">
            <button className="button update-btn" type="submit">
              Update Course
            </button>
            <Link
              className="button button-secondary delete-btn"
              to={{
                pathname: `/courses/${currentCourse.id}`,
                state: {
                  courseId: currentCourse.id,
                },
              }}
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
