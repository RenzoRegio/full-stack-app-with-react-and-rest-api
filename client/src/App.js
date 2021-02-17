import { BrowserRouter, Route, Switch } from "react-router-dom";
import Courses from "./components/Courses";
import Header from "./components/Header";

export default () => {
  return (
    <BrowserRouter>
      <Header />
      <Route path="/" component={Courses} />
    </BrowserRouter>
  );
};
