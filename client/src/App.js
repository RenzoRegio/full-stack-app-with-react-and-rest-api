import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Courses from "./components/Courses";
import Header from "./components/Header";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignOut from "./components/UserSignOut";
import NotFound from "./components/NotFound";
import Forbidden from "./components/Forbidden";
import UnhandledError from "./components/UnhandledError";
import PrivateRoute from "./PrivateRoute";

export default () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Redirect exact path="/" to="/courses" />
        <Route exact path="/courses" component={Courses} />
        <PrivateRoute exact path="/courses/create" component={CreateCourse} />
        <Route exact path="/courses/:id/update" component={UpdateCourse} />
        <Route exact path="/courses/:id" component={CourseDetail} />
        <Route exact path="/sign-in" component={UserSignIn} />
        <Route exact path="/sign-up" component={UserSignUp} />
        <Route exact path="/sign-out" component={UserSignOut} />
        <Route exact path="/notfound" component={NotFound} />
        <Route exact path="/forbidden" component={Forbidden} />
        <Route exact path="/error" component={UnhandledError} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};
