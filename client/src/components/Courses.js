import React, { useEffect, useState, useContext } from "react";
import { Component } from "react";
import { Context } from "../Context";

export default function Courses() {
  const { data } = useContext(Context);
  const [courses, setCourses] = useState([]);

  useEffect(async () => {
    const coursesContainer = await data.getCourses();
    coursesContainer.courses.map((newCourse) => {
      setCourses((prevCourses) => [...prevCourses, newCourse.title]);
    });
  }, []);

  return (
    <div className="bounds">
      {courses.map((course, i) => (
        <div className="grid-33" key={i}>
          <a className="course--module course--link" href="#">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course}</h3>
          </a>
        </div>
      ))}
    </div>
  );
}
