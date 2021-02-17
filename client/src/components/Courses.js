import React, { useEffect, useState, useContext } from "react";
import { Context } from "../Context";
import { NavLink } from "react-router-dom";

export default function Courses() {
  const { data } = useContext(Context);
  const [courses, setCourses] = useState([]);

  useEffect(async () => {
    const coursesContainer = await data.getCourses();
    coursesContainer.courses.map((newCourse) => {
      setCourses((prevCourses) => [...prevCourses, newCourse]);
    });
  }, []);

  return (
    <div className="bounds">
      {courses.map((course, i) => (
        <div className="grid-33" key={i}>
          <NavLink
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
          </NavLink>
        </div>
      ))}
    </div>
  );
}
