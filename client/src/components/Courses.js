import React, { useEffect, useState, useContext } from "react";
import { Context } from "../Context";
import { Link } from "react-router-dom";

export default function Courses() {
  const { data, authenticatedUser } = useContext(Context);
  const [courses, setCourses] = useState([]);

  async function displayCourses() {
    const coursesContainer = await data.getCourses();
    coursesContainer.courses.map((newCourse) => {
      setCourses((prevCourses) => [...prevCourses, newCourse]);
    });
  }

  useEffect(async () => {
    displayCourses();
  }, []);

  return (
    <div className="bounds">
      {courses.map((course, i) => (
        <div className="grid-33" key={i}>
          <Link
            className="course--module course--link"
            to={{
              pathname: `/courses/${course.id}`,
              state: {
                courseId: course.id,
              },
            }}
          >
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
          </Link>
        </div>
      ))}
      {authenticatedUser ? (
        <React.Fragment>
          <div className="grid-33">
            <Link
              className="course--module course--add--module"
              to="/courses/create"
            >
              <h3 className="course--add--title">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 13 13"
                  className="add"
                >
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>
                New Course
              </h3>
            </Link>
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
}
