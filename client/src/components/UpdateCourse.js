import { Context } from "../Context";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function UpdateCourse() {
  const { course, data, password1, authenticatedUser } = useContext(Context);
  const [currentCourse, setCurrentCourse] = useState(course);
  const [title, setTitle] = useState(currentCourse.title);
  const [description, setDescription] = useState(currentCourse.description);
  const [estimatedTime, setEstimatedTime] = useState(
    currentCourse.estimatedTime
  );
  const [materialsNeeded, setMaterialsNeeded] = useState(
    currentCourse.materialsNeeded
  );
  const history = useHistory();

  const change = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    } else if (e.target.name === "estimatedTime") {
      setEstimatedTime(e.target.value);
    } else if (e.target.name === "materialsNeeded") {
      setMaterialsNeeded(e.target.value);
    }
  };

  const emailAddress = authenticatedUser.user.emailAddress;
  const updateCourseData = {
    title,
    description,
    estimatedTime,
    materialsNeeded,
  };

  const submit = (e) => {
    e.preventDefault();
    data
      .updateCourse(course.id, updateCourseData, emailAddress, password1)
      .then((err) => {
        if (err.length) {
          console.log(err);
        } else {
          history.push(`/`);
        }
      });
  };

  return (
    <div className="bounds course--detail">
      <h1>Update Course</h1>
      <div>
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
              <p>AUTHOR</p>
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
            <button className="button" type="submit">
              Update Course
            </button>
            <Link
              className="button button-secondary"
              to={{
                pathname: `/courses/${course.id}`,
                state: {
                  courseId: course.id,
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
}
