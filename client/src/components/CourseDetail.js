import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context";
import { Link, useHistory } from "react-router-dom";

export default function CourseDetail(props) {
  const [course, setCourse] = useState({});
  const [materials, setMaterials] = useState([]);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { data, authenticatedUser, password1, actions } = useContext(Context);
  const history = useHistory();

  useEffect(async () => {
    const response = await data.getCourse(props.location.state.courseId);
    const course = response.course;
    let items;
    if (course.materialsNeeded) {
      if (course.materialsNeeded.includes("*")) {
        items = course.materialsNeeded.split("*").filter((item) => item);
        setMaterials((prevMaterials) => [...prevMaterials, ...items]);
      }
    } else {
      items = course.materialsNeeded;
      setMaterials((prevMaterials) => [...prevMaterials, items]);
    }
    setCourse(course);
    setName(`${course.user.firstName} ${course.user.lastName}`);
    setUserId(course.user.id);
    setUserEmail(course.user.emailAddress);
    setUserPassword(password1);
  }, []);

  const deleteCourse = () => {
    data.deleteCourse(course.id, userEmail, userPassword).then((err) => {
      if (err.length) {
        console.log(err);
      } else {
        history.push("/");
      }
    });
  };

  const updateCourse = () => {
    actions.getCourse(course);
    history.push(`/courses/${course.id}/update`);
  };

  return (
    <React.Fragment>
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            {authenticatedUser && userId == authenticatedUser.user.id ? (
              <React.Fragment>
                <span>
                  <button
                    className="button update-btn"
                    onClick={() => updateCourse()}
                  >
                    Update Course
                  </button>
                  <button
                    className="button delete-btn"
                    onClick={() => deleteCourse()}
                  >
                    Delete Course
                  </button>
                </span>
              </React.Fragment>
            ) : null}
            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
          </div>
        </div>
      </div>
      <div className="bounds course--detail">
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
            <p>By {name} </p>
          </div>
          <div className="course--description">
            <p>{course.description}</p>
          </div>
        </div>
      </div>
      <div className="grid-25 grid-right">
        <div className="course--stats">
          <ul className="course--stats--list">
            <li className="course--stats--list--item">
              <h4>Estimated Time</h4>
              <h3>{course.estimatedTime}</h3>
            </li>
            <li className="course--stats--list--item">
              <h4>Materials Needed</h4>
              <ul>
                {materials.map((material, i) => (
                  <li key={i}>{material}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}
