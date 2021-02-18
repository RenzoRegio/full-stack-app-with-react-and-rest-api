import { Context } from "../Context";
import React, { useContext, useEffect, useState } from "react";

export default function UpdateCourse() {
  const { course } = useContext(Context);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(course.title);
  }, []);

  const change = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    }
  };
  return (
    <div className="bounds course--detail">
      <h1>Update Course</h1>
      <div>
        <form>
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
                >
                  DESCRIPTION
                </textarea>
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
                      value="ESTIMATEDTIME"
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
                    >
                      MATERIALS
                    </textarea>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-100 pad-bottom">
            <button className="button" type="submit">
              Update Course
            </button>
            <button className="button button-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
