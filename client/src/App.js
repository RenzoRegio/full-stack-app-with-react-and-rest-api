import { BrowserRouter, Route, Switch } from "react-router-dom";
import Courses from "./components/Courses";
import Header from "./components/Header";
import CourseDetail from "./components/CourseDetail";
export default () => {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={Courses} />
      <Route exact path="/courses/:id" component={CourseDetail} />
    </BrowserRouter>
  );
};
