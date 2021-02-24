import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../Context";
import ReactMarkdown from "react-markdown";

export default () => {
  const { data, authenticatedUser, userPassword } = useContext(Context);
  const history = useHistory();

  //Information for the User
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");

  //Information for the Course
  const [course, setCourse] = useState({});
  const [materials, setMaterials] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(async () => {
    try {
      //Retrieves the current course from the URI specified.
      const response = await data.getCourse(window.location.pathname);
      const course = response.course;
      const user = course.user;

      setCourse(course);
      setUserName(`${user.firstName} ${user.lastName}`);
      setUserId(user.id);
      setUserEmail(user.emailAddress);
      const items = course.materialsNeeded.split(/\n/).map((item) => item);
      setMaterials((prevMaterials) => [...prevMaterials, ...items]);
    } catch (err) {
      history.push("/notfound");
    }
  }, []);

  /**
   * Deletes / Destroys the current course.
   */

  const deleteCourse = () => {
    data
      .deleteCourse(course.id, userEmail, userPassword)
      .then((res) => {
        console.log(res);
        history.push("/");
      })
      .catch((err) => {
        console.error(err);
        history.push("/error");
      });
  };

  return (
    <React.Fragment>
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            {authenticatedUser && userId == authenticatedUser.user.id ? (
              <React.Fragment>
                <span>
                  <Link
                    className="button update-btn"
                    to={`/courses/${course.id}/update`}
                  >
                    Update Course
                  </Link>
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
            <p>By {userName} </p>
          </div>
          <div className="course--description">
            <ReactMarkdown children={course.description} />
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
                {materials.map((material, i) => {
                  return <ReactMarkdown key={i} children={material} />;
                })}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};
