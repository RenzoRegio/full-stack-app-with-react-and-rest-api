import { Context } from "../Context";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function UpdateCourse() {
  const history = useHistory();
  const { data, authenticatedUser, userPassword } = useContext(Context);

  const [title, setTitle] = useState("");
  const [currentCourse, setCurrentCourse] = useState({});
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  let emailAddress;

  if (authenticatedUser) {
    emailAddress = authenticatedUser.user.emailAddress;
  }

  useEffect(async () => {
    let path = window.location.pathname;
    path = path.replace("/update", "");

    await data
      .getCourse(path)
      .then((response) => {
        if (
          !authenticatedUser ||
          response.course.user.id !== authenticatedUser.user.id
        ) {
          history.push("/forbidden");
        } else {
          setTitle(response.course.title);
          setDescription(response.course.description);
          setEstimatedTime(response.course.estimatedTime);
          setMaterialsNeeded(response.course.materialsNeeded);
          setCurrentCourse(response.course);
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
          console.log(err);
        } else {
          history.push(`/`);
        }
      })
      .catch((err) => {
        console.error(err);
        history.push("/error");
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
              {/* <p>{`${authenticatedUser.user.firstName} ${authenticatedUser.user.lastName}`}</p> */}
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
}
