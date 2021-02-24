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
        <Route exact path="/" component={Courses} />
        <PrivateRoute exact path="/courses/create" component={CreateCourse} />
        <PrivateRoute
          exact
          path="/courses/:id/update"
          component={UpdateCourse}
        />
        <Route exact path="/courses/:id" component={CourseDetail} />
        <Route exact path="/signin" component={UserSignIn} />
        <Route exact path="/signup" component={UserSignUp} />
        <Route exact path="/signout" component={UserSignOut} />
        <Route exact path="/notfound" component={NotFound} />
        <Route exact path="/forbidden" component={Forbidden} />
        <Route exact path="/error" component={UnhandledError} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};
